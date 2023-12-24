const router = require("express").Router();
const Book = require("../models/bookModel");

// Adding a book into database
router.post("/add-book", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    console.log(req.body);
    await newBook.save();
    res.send({
      success: true,
      message: "The new book has been added!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err,
    });
  }
});

// Getting all the books at once
router.get("/get-all-books", async (req, res) => {
  try {
    const allBooks = await Book.find();
    res.send({
      success: true,
      message: "All books successfully fetched!",
      data: allBooks,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err,
    });
  }
});

// Get a single book
router.post("/get-book-by-id/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.send({
      success: true,
      message: "Book has been fetched!",
      data: book,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err,
    });
  }
});

// Update a book
router.put("/update-book", async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.body.bookId, req.body);
    console.log(req.body);
    res.send({
      success: true,
      message: "The book has been updated!",
    });
  } catch (err) {
    res.send({
      success: true,
      message: err,
    });
  }
});

// Delete a book
router.post("/delete-book", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.body.bookId);
    res.send({
      success: true,
      message: "The book has been successfully removed!",
    });
  } catch (err) {
    res.send({
      success: true,
      message: err,
    });
  }
});

// Books added by user
router.post("/books-added-by-user", async (req, res) => {
  try {
    const books = await Book.find({ user: req.body.userId });
    res.send({
      success: true,
      message: "Books added by the user have been fetched successfully!",
      data: books,
    });
  } catch (err) {
    res.send({
      success: true,
      message: err.message,
    });
  }
});

module.exports = router;
