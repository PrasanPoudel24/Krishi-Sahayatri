from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import numpy as np
import os

# ---------------------------------------------------------
# 1. Load model artifacts once, at startup (not per-request)
# ---------------------------------------------------------
MODEL_DIR = os.path.join(os.path.dirname(__file__), "model")

model = joblib.load(os.path.join(MODEL_DIR, "crop_model.pkl"))
scaler = joblib.load(os.path.join(MODEL_DIR, "crop_scaler.pkl"))
label_encoder = joblib.load(os.path.join(MODEL_DIR, "crop_label_encoder.pkl"))
feature_columns = joblib.load(os.path.join(MODEL_DIR, "crop_feature_columns.pkl"))
# feature_columns == ['N kg/ha', 'P kg/ha', 'K kg/ha', 'temperature', 'humidity', 'ph', 'rainfall']

app = FastAPI(
    title="Crop Recommendation API",
    description="Predicts the best crop to grow given soil and weather conditions.",
    version="1.0.0",
)

# Allow the Node backend (and, if you ever test directly, your React dev server) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------
# 2. Define the request schema (this is what /docs will show)
# ---------------------------------------------------------
class CropInput(BaseModel):
    N: float = Field(..., description="Nitrogen content in soil (kg/ha)", json_schema_extra={"example": 90})
    P: float = Field(..., description="Phosphorus content in soil (kg/ha)", json_schema_extra={"example": 42})
    K: float = Field(..., description="Potassium content in soil (kg/ha)", json_schema_extra={"example": 43})
    temperature: float = Field(..., description="Temperature in Celsius", json_schema_extra={"example": 20.8})
    humidity: float = Field(..., description="Relative humidity in %", json_schema_extra={"example": 82.0})
    ph: float = Field(..., description="Soil pH value", json_schema_extra={"example": 6.5})
    rainfall: float = Field(..., description="Rainfall in mm", json_schema_extra={"example": 202.9})


class CropPrediction(BaseModel):
    recommended_crop: str
    confidence: float


# ---------------------------------------------------------
# 3. Routes
# ---------------------------------------------------------
@app.get("/")
def root():
    return {"message": "Crop Recommendation API is running. Visit /docs to try it out."}


@app.post("/predict", response_model=CropPrediction)
def predict_crop(data: CropInput):
    try:
        # Build the feature vector in the EXACT order the model was trained on
        features = np.array([[
            data.N,
            data.P,
            data.K,
            data.temperature,
            data.humidity,
            data.ph,
            data.rainfall,
        ]])

        # Apply the same scaling used during training
        features_scaled = scaler.transform(features)

        # Predict
        prediction_encoded = model.predict(features_scaled)[0]
        probabilities = model.predict_proba(features_scaled)[0]
        confidence = float(np.max(probabilities))

        # Decode numeric label back to crop name
        crop_name = label_encoder.inverse_transform([prediction_encoded])[0]

        return CropPrediction(recommended_crop=crop_name, confidence=round(confidence, 4))

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))