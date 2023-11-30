const mongoose = require("mongoose");

const bookModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      required: true,
      default: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("books", bookModel);
