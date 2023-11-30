const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      requierd: true,
    },
    title: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    willRecommend: {
      type: Boolean,
      required: true,
      default: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
      required: true
    }
  },
  { timestamps: true }
);

const ratingModel = mongoose.model("ratings", ratingSchema);
module.exports = ratingModel;
