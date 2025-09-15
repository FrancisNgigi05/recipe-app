const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://recipe-app-6-85cq.onrender.com/recipes"
    : "http://localhost:5000/recipes";

export { API_URL };

export {API_URL};