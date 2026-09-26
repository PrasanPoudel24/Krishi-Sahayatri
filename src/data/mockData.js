import { tokens } from "../styles/tokens";

export const yieldTrend = [
  { m: "Baisakh", yield: 2.1 },
  { m: "Jestha", yield: 2.4 },
  { m: "Ashadh", yield: 2.9 },
  { m: "Shrawan", yield: 3.4 },
  { m: "Bhadra", yield: 3.1 },
  { m: "Ashwin", yield: 3.8 },
  { m: "Kartik", yield: 4.2 },
];

export const cropDist = [
  { name: "Rice", value: 38, color: tokens.gold },
  { name: "Maize", value: 27, color: tokens.sage },
  { name: "Wheat", value: 19, color: "#7C97C2" },
  { name: "Millet", value: 16, color: tokens.rust },
];

export const recentPredictions = [
  { id: 1, type: "Crop", input: "N:90 P:42 K:43, pH 6.5", result: "Rice", conf: 94, time: "2 min ago" },
  { id: 2, type: "Yield", input: "Maize · Rautahat · 1.2 ha", result: "3.8 t/ha", conf: 88, time: "1 hr ago" },
  { id: 3, type: "Fertilizer", input: "Wheat, N-low, K-medium", result: "Urea + MOP", conf: 91, time: "3 hr ago" },
  { id: 4, type: "Crop", input: "N:60 P:55 K:44, pH 5.9", result: "Maize", conf: 86, time: "Yesterday" },
];

export const NAV = [
  { id: "overview", label: "Overview", icon: "LayoutDashboard" },
  { id: "crop", label: "Crop prediction", icon: "Sprout" },
  { id: "yield", label: "Yield prediction", icon: "TrendingUp" },
  { id: "fertilizer", label: "Fertilizer", icon: "FlaskConical" },
  { id: "profile", label: "Profile", icon: "User" },
];

export const PREDICT_CONFIG = {
  crop: {
    title: "Crop prediction",
    desc: "K-nearest neighbours on soil nutrients and climate.",
    fields: [
      ["Nitrogen (N)", "90"], ["Phosphorus (P)", "42"], ["Potassium (K)", "43"],
      ["Soil pH", "6.5"], ["Rainfall (mm)", "220"],
      ["Temperature (°C)", "26"], ["Humidity (%)", "68"],
    ],
    resultLabel: "Recommended crop", resultValue: "Rice", conf: 94,
  },
  yield: {
    title: "Yield prediction",
    desc: "Regression model on crop, climate and input-use features.",
    fields: [
      ["Crop name", "Maize"], ["Average rainfall (mm)", "180"],
      ["Pesticides used (kg/ha)", "1.4"], ["Temperature (°C)", "24"],
    ],
    resultLabel: "Estimated yield", resultValue: "3.8 t/ha", conf: 88,
  },
  fertilizer: {
    title: "Fertilizer recommendation",
    desc: "Classifier over soil condition, weather and crop stage.",
    fields: [
      ["Temperature (°C)", "28"], ["Humidity (%)", "62"], ["Moisture (%)", "35"],
      ["Soil type", "Loamy"], ["Crop name", "Wheat"],
      ["Nitrogen (N)", "Low"], ["Phosphorus (P)", "Medium"], ["Potassium (K)", "Medium"],
    ],
    resultLabel: "Recommended fertilizer", resultValue: "Urea + MOP", conf: 91,
  },
};
