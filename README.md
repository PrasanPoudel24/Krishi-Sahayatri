# Kishan Sahayatri — किषान सहयात्री

Frontend for the Smart Agricultural Prediction System: crop prediction, yield
prediction, fertilizer recommendation, and a dashboard, built with React.

## Folder structure

```
src/
  App.jsx                      # root component, view routing (login/signup/forgot/dashboard)
  main.jsx                     # Vite entry point
  index.css                    # base page styles
  styles/
    tokens.js                  # color palette, font imports (design tokens)
  utils/
    validators.js              # username / password / email validation rules
  data/
    mockData.js                # mock chart data, nav config, prediction form field configs
  components/
    shared/
      Logo.jsx
      TerraceDivider.jsx       # signature terraced-field divider motif
      Field.jsx                # labeled input with validation error/hint display
      PrimaryButton.jsx
    auth/
      AuthShell.jsx            # two-pane layout wrapping login/signup/forgot
      LoginView.jsx
      SignupView.jsx
      ForgotView.jsx
    dashboard/
      Dashboard.jsx            # dashboard shell (sidebar + topbar + active view)
      Sidebar.jsx
      Topbar.jsx
      Overview.jsx             # stat cards, yield trend chart, crop distribution, recent predictions
      PredictForm.jsx          # shared form for crop / yield / fertilizer prediction
      Profile.jsx              # editable profile section
```

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Connecting to your FastAPI backend

Right now `PredictForm.jsx` and the auth views use mock data/local state.
To wire it up for real:

1. Add an API client (e.g. `src/api/client.js`) with a base URL pointing at
   your FastAPI server.
2. In `PredictForm.jsx`, replace the `setResult(config)` mock call with a
   `fetch`/`axios` POST to your `/predict/crop`, `/predict/yield`, or
   `/predict/fertilizer` endpoints, sending `vals` as the request body.
3. In `LoginView.jsx` and `SignupView.jsx`, replace `onLogin`/`setDone` with
   real calls to your `/auth/login` and `/auth/signup` endpoints, and store
   the returned session/token (e.g. in memory or an httpOnly cookie set by
   the backend).
