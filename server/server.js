const express = require("express");
const userRoute = require("./routes/userRoute");
const bookRoute = require("./routes/bookRoute");
const ratingRoute = require("./routes/ratingRoute");
const cartRoute = require("./routes/cartRoute");
const purchaseRoute = require("./routes/purchaseRoute");
const cors = require("cors");

const app = express();
const PORT = 8080;

require("dotenv").config();
const dbConfig = require("./config/dbConfig");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/books", bookRoute);
app.use("/api/ratings", ratingRoute);
app.use("/api/carts", cartRoute);
app.use("/api/purchases", purchaseRoute);

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
