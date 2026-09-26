# Crop Yield Prediction API — Step-by-Step Guide (VS Code)

This project wraps your trained `decision_tree_model.pkl` in a FastAPI web service.

## What's in this zip

```
yield_prediction_api/
├── main.py               # FastAPI app
├── requirements.txt      # Python dependencies (versions pinned)
├── decision_tree_model.pkl   # Your trained model
└── README.md              # This guide
```

## Model input/output reference

| Field | Type | Example | Notes |
|---|---|---|---|
| `Area` | string | `"Australia"` | Must be one of 101 countries the model was trained on (see `/valid-options`) |
| `Item` | string | `"Rice, paddy"` | One of: Cassava, Maize, Plantains and others, Potatoes, Rice, paddy, Sorghum, Soybeans, Sweet potatoes, Wheat, Yams |
| `average_rain_fall_mm_per_year` | float | `1500` | |
| `pesticides_tonnes` | float | `400` | |
| `avg_temp` | float | `14` | |

Output: `predicted_yield_kg_per_ha` (float)

⚠️ **Version note**: this `.pkl` was saved with **scikit-learn 1.6.1**. Using a different sklearn version can throw an `AttributeError` on load. `requirements.txt` pins this version — don't change it unless you retrain and re-save the model.

---

## Step 1 — Unzip and open in VS Code

1. Unzip `yield_prediction_api.zip` anywhere on your machine.
2. Open VS Code → **File → Open Folder** → select `yield_prediction_api`.

## Step 2 — Open the integrated terminal

Menu: **Terminal → New Terminal** (or `` Ctrl+` ``). Make sure it opens inside the `yield_prediction_api` folder.

## Step 3 — Create a virtual environment

```bash
python -m venv venv
```

Activate it:
- **Windows (PowerShell):** `venv\Scripts\Activate.ps1`
- **Windows (cmd):** `venv\Scripts\activate.bat`
- **macOS/Linux:** `source venv/bin/activate`

You should see `(venv)` at the start of your terminal prompt.

If VS Code shows a popup "Select environment as workspace default interpreter," click **Yes**. Otherwise: `Ctrl+Shift+P` → *Python: Select Interpreter* → choose the one inside `venv`.

## Step 4 — Install dependencies

```bash
pip install -r requirements.txt
```

This installs FastAPI, Uvicorn, scikit-learn 1.6.1, pandas, joblib, and pydantic.

## Step 5 — Review `main.py` (optional but recommended)

Open `main.py` in VS Code. It:
1. Loads `decision_tree_model.pkl` once at startup.
2. Defines a `YieldInput` schema (validates types automatically).
3. Exposes:
   - `GET /` — health message
   - `GET /health` — simple status check
   - `GET /valid-options` — lists valid `Area` and `Item` values
   - `POST /predict` — runs the model and returns a prediction

## Step 6 — Run the server

```bash
uvicorn main:app --reload
```

Expected output:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Application startup complete.
```

`--reload` auto-restarts the server whenever you save changes to `main.py` — useful for development, remove it in production.

## Step 7 — Test the API

### Option A: Swagger UI (recommended, no extra tools needed)

Open **http://127.0.0.1:8000/docs** in your browser.

1. Expand `POST /predict`.
2. Click **Try it out**.
3. Edit the example JSON, e.g.:
   ```json
   {
     "Area": "Australia",
     "Item": "Rice, paddy",
     "average_rain_fall_mm_per_year": 1500,
     "pesticides_tonnes": 400,
     "avg_temp": 14
   }
   ```
4. Click **Execute**. You'll see the response below, e.g.:
   ```json
   { "predicted_yield_kg_per_ha": 3302.12 }
   ```

### Option B: curl

```bash
curl -X POST "http://127.0.0.1:8000/predict" ^
  -H "Content-Type: application/json" ^
  -d "{\"Area\":\"Australia\",\"Item\":\"Rice, paddy\",\"average_rain_fall_mm_per_year\":1500,\"pesticides_tonnes\":400,\"avg_temp\":14}"
```
(macOS/Linux: replace `^` line continuations with `\` and use single quotes around the JSON.)

### Option C: Python requests

```python
import requests

response = requests.post(
    "http://127.0.0.1:8000/predict",
    json={
        "Area": "Australia",
        "Item": "Rice, paddy",
        "average_rain_fall_mm_per_year": 1500,
        "pesticides_tonnes": 400,
        "avg_temp": 14
    }
)
print(response.json())
```

## Step 8 — Stop the server

Press `Ctrl+C` in the terminal.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `AttributeError: Can't get attribute '_RemainderColsList'` | Your sklearn version doesn't match 1.6.1. Run `pip install scikit-learn==1.6.1 --force-reinstall`. |
| `FileNotFoundError: decision_tree_model.pkl` | Make sure you run `uvicorn` from inside the folder containing the `.pkl` file. |
| `400 Bad Request: Unknown Area/Item` | Check `GET /valid-options` for the exact allowed spelling (e.g. `"Rice, paddy"`, not `"Rice"`). |
| Port already in use | Run `uvicorn main:app --reload --port 8001` instead. |

## Next steps (optional)

- **Dockerize** for consistent deployment.
- **Add CORS** if calling this from a browser-based frontend:
  ```python
  from fastapi.middleware.cors import CORSMiddleware
  app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
  ```
- **Deploy** to Render, Railway, Fly.io, or a VPS with `uvicorn main:app --host 0.0.0.0 --port 8000` (drop `--reload` in production).
