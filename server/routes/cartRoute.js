const Cart = require("../models/cartModel");
const router = require("express").Router();

// create cart
router.post("/create-cart", async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    await newCart.save();
    res.send({
      success: true,
      message: "Book has been added to the cart!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.post("/get-cart", async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.body.userId }).populate(
      "book"
    );
    res.send({
      success: true,
      message: "All the cart items have been fetched successfully!",
      data: cartItems,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.post("/remove-cart", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.body.cartId);
    res.send({
      success: true,
      message: "The book has been removed from your cart!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.put("/update-cart", async (req, res) => {
  try {
    await Cart.findByIdAndUpdate(req.body.cartId, req.body);
    res.send({
      success: true,
      message: "The cart has been updated!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
