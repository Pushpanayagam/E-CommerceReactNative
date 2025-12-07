// routes/order.route.js
import express from "express";
import auth from "../middleware/auth.js";
import { placeOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/place", auth, placeOrder);

export default router;
