import express from "express";
import productRoutes from "./routes/product.route.js";
//import authRoutes from "./routes/auth.route.js";
import authRoutes from "./routes/auth.route.js";
import cartRoutes from "./routes/cart.route.js";
import orderRoutes from "./routes/order.route.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import  cors from "cors";

dotenv.config();
connectDB();

const app = express();
// Enable CORS for all routes
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
//app.listen(3000, () => console.log("Server running on port 3000"));
export default app;