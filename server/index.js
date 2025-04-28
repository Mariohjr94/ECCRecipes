const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});