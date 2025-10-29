const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

// development
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`File Uploader Dev - Listening on port ${PORT}`);
});
// deploy
// app.listen(PORT, () =>
//     console.log(`File Uploader - Listening on port ${PORT}`)
//   );
