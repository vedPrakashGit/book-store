const Rating = require("../models/ratingModel");
const router = require("express").Router();

router.post("/add-rating", async (req, res) => {
  try {
    const newRating = new Rating(req.body);
    await newRating.save();
    res.send({
      success: true,
      message: "Your rating/review has been successfully added!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.post("/remove-rating", async (req, res) => {
  try {
    await Rating.findByIdAndDelete(req.body.ratingId);
    res.send({
      success: true,
      message: "Your rating/review has been successfully removed!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.post("/get-ratings", async (req, res) => {
  try {
    const ratings = await Rating.find({ book: req.body.bookId }).populate(
      "user"
    );
    res.send({
      success: true,
      message: "Ratings have been successfully fetched!",
      data: ratings,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.post("/get-ratings-by-user", async (req, res) => {
  try {
    const ratings = await Rating.find({ user: req.body.userId }).populate(
      "book"
    );
    res.send({
      success: true,
      message: "Ratings have been fetched successfully!",
      data: ratings,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
