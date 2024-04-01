const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;

// Define the path to your public directory
const publicDirectoryPath = path.join(__dirname, "../public");

// Serve static files from the public directory
app.use(express.static(publicDirectoryPath));

// Define your routes
app.get("/index2", (req, res) => {
  res.send("index");
});

app.get("/about", (req, res) => {
  res.send("about");
});

app.get("/weather", (req, res) => {
  res.send("weather");
});

// Start the server
app.listen(port, () => {
  console.log(`listening to the port at ${port}`);
});
