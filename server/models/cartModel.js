const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "books",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const cartModel = mongoose.model("carts", cartSchema);
module.exports = cartModel;
