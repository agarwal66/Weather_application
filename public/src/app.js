const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;

console.log(path.join(__dirname, "../public"));
// app.use(express.static(static_path));
app.get("/index2", (req, res) => {
  res.send("index");
});
app.get("/about", (req, res) => {
  res.send("about");
});
app.get("/weather", (req, res) => {
  res.send("weather");
});
app.listen(port, () => {
  console.log(`listening to the port at ${port}`);
});
