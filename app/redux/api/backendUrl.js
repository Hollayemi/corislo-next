export const server = process.env.NODE_ENV === "production"
    ? "https://corislo-backend.onrender.com"
    : "http://localhost:5001" //"http://172.20.10.8:5001";
