const express = require("express");
const userRoute = require("./routes/userRoute");
const bookRoute = require("./routes/bookRoute");
const ratingRoute = require("./routes/ratingRoute");
const cartRoute = require("./routes/cartRoute");
const cors = require("cors");

const app = express();
const PORT = 8080;

require("dotenv").config();
const dbConfig = require("./config/dbConfig");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTNlMzM3Mzg4N2VhMjcwZWY2N2ZmYzUiLCJpYXQiOjE2OTg1OTQwOTIsImV4cCI6MTY5ODY4MDQ5Mn0.NnFGOU-wUGLQXflrO15Tk2Jtf2SJN5kjVj0iNnNb5Pk

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/books", bookRoute);
app.use("/api/ratings", ratingRoute);
app.use("/api/carts", cartRoute);

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
