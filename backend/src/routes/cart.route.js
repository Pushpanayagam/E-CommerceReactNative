// routes/cart.route.js
import express from "express";
import auth from "../middleware/auth.js";

import {
  getCart,
  addItemToCart,
  removeItemFromCart
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", auth, getCart);         // Get user cart
router.post("/add", auth, addItemToCart); // Add/update item
router.post("/remove", auth, removeItemFromCart); // Remove item

export default router;
