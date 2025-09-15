const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://recipe-app-6-85cq.onrender.com"
    : "http://localhost:5000";

export { API_URL };