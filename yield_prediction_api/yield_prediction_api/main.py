from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import pandas as pd
import joblib

# ------------------------------------------------------------------
# 1. Load the trained model once, at startup (not per-request)
# ------------------------------------------------------------------
MODEL_PATH = "decision_tree_model.pkl"
model = joblib.load(MODEL_PATH)

# ------------------------------------------------------------------
# 2. Reference lists (from your training data) used for validation
# ------------------------------------------------------------------
VALID_AREAS = {
    "Albania", "Algeria", "Angola", "Argentina", "Armenia", "Australia",
    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Belarus",
    "Belgium", "Botswana", "Brazil", "Bulgaria", "Burkina Faso", "Burundi",
    "Cameroon", "Canada", "Central African Republic", "Chile", "Colombia",
    "Croatia", "Denmark", "Dominican Republic", "Ecuador", "Egypt",
    "El Salvador", "Eritrea", "Estonia", "Finland", "France", "Germany",
    "Ghana", "Greece", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras",
    "Hungary", "India", "Indonesia", "Iraq", "Ireland", "Italy", "Jamaica",
    "Japan", "Kazakhstan", "Kenya", "Latvia", "Lebanon", "Lesotho", "Libya",
    "Lithuania", "Madagascar", "Malawi", "Malaysia", "Mali", "Mauritania",
    "Mauritius", "Mexico", "Montenegro", "Morocco", "Mozambique", "Namibia",
    "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Norway",
    "Pakistan", "Papua New Guinea", "Peru", "Poland", "Portugal", "Qatar",
    "Romania", "Rwanda", "Saudi Arabia", "Senegal", "Slovenia",
    "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden",
    "Switzerland", "Tajikistan", "Thailand", "Tunisia", "Turkey", "Uganda",
    "Ukraine", "United Kingdom", "Uruguay", "Zambia", "Zimbabwe",
}

VALID_ITEMS = {
    "Cassava", "Maize", "Plantains and others", "Potatoes", "Rice, paddy",
    "Sorghum", "Soybeans", "Sweet potatoes", "Wheat", "Yams",
}

# ------------------------------------------------------------------
# 3. Define the request/response schemas
# ------------------------------------------------------------------
class YieldInput(BaseModel):
    Area: str = Field(..., examples=["Australia"])
    Item: str = Field(..., examples=["Rice, paddy"])
    average_rain_fall_mm_per_year: float = Field(..., gt=0, examples=[1500])
    pesticides_tonnes: float = Field(..., ge=0, examples=[400])
    avg_temp: float = Field(..., examples=[14])


class YieldOutput(BaseModel):
    predicted_yield_kg_per_ha: float


# ------------------------------------------------------------------
# 4. Create the FastAPI app
# ------------------------------------------------------------------
app = FastAPI(
    title="Crop Yield Prediction API",
    description="Predicts crop yield (kg/ha) using a trained Decision Tree model.",
    version="1.0.0",
)


@app.get("/")
def root():
    return {"message": "Yield Prediction API is running. Go to /docs to try it."}


@app.get("/health")
def health_check():
    return {"status": "ok", "model_loaded": model is not None}


@app.get("/valid-options")
def valid_options():
    """Helper endpoint so frontend/clients know which Area/Item values are valid."""
    return {"areas": sorted(VALID_AREAS), "items": sorted(VALID_ITEMS)}


@app.post("/predict", response_model=YieldOutput)
def predict_yield(data: YieldInput):
    # Reject unknown categories instead of silently letting
    # OneHotEncoder(handle_unknown="ignore") zero them out
    if data.Area not in VALID_AREAS:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown Area '{data.Area}'. See /valid-options for the full list.",
        )
    if data.Item not in VALID_ITEMS:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown Item '{data.Item}'. Must be one of: {sorted(VALID_ITEMS)}",
        )

    # Build a single-row DataFrame matching the training column names exactly
    input_df = pd.DataFrame([{
        "Area": data.Area,
        "Item": data.Item,
        "average_rain_fall_mm_per_year": data.average_rain_fall_mm_per_year,
        "pesticides_tonnes": data.pesticides_tonnes,
        "avg_temp": data.avg_temp,
    }])

    try:
        prediction = model.predict(input_df)[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")

    return YieldOutput(predicted_yield_kg_per_ha=round(float(prediction), 2))