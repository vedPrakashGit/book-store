const router = require("express").Router();
const Purchase = require("../models/purchaseModel");
const authMiddleware = require("../middlewares/authMiddleware");
const stripe = require("stripe")(
  "sk_test_51NqI5xSGUfHxcIWSF1nmkHmEN6MX4F7LknmWo9zqlfR8P0VWLjAF0tXjNYkuSzwqwkC7Jy7Y7VdKDFp5EMhWT25k00xFZCaOEn"
);

router.post("/make-payment", authMiddleware, async (req, res) => {
  try {
    const { token, amount } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      payment_method_types: ["card"],
      receipt_email: token.email,
      description: "Book purchase has been done successfully!",
    });

    // const charge = await stripe.charges.create({
    //   amount: amount,
    //   currency: "usd",
    //   description: "Transaction complete for book purchase",
    // });
    const transactionId = paymentIntent.id;
    res.send({
      success: true,
      message: "You've successfully made the payment!",
      data: transactionId,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.post("/add-to-purchase", authMiddleware, async (req, res) => {
  try {
    const newPurchase = new Purchase(req.body);
    await newPurchase.save();
    res.send({
      success: true,
      messgae: "You've successfully checked out!",
      data: newPurchase,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.post("/get-purchased-books", authMiddleware, async (req, res) => {
  try {
    const purchasedBooks = await Purchase.find({ user: req.body.userId });
    res.send({
      success: true,
      message: "Purchased books have been fetched!",
      data: purchasedBooks,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
