// controllers/order.controller.js
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }

    const items = cart.items.map(it => ({
      product: it.product._id,
      qty: it.qty,
      price: it.product.price
    }));

    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    const order = await Order.create({
      user: req.user.id,
      items,
      total
    });

    cart.items = [];
    await cart.save();

    res.json({ success: true, order });

  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
