// controllers/cart.controller.js
import Cart from "../models/Cart.js";

// 🟢 Get User Cart
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Add or Update Item in Cart
export const addItemToCart = async (req, res) => {
  const { productId, qty } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    const index = cart.items.findIndex(
      (i) => i.product.toString() === productId
    );

    if (index === -1) {
      cart.items.push({ product: productId, qty });
    } else {
      cart.items[index].qty = qty;
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Remove Item From Cart
export const removeItemFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.json({ message: "Cart is empty" });

    cart.items = cart.items.filter(
      (i) => i.product.toString() !== productId
    );

    await cart.save();
    res.json(cart);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
