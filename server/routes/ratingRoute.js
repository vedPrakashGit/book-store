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

module.exports = router;
