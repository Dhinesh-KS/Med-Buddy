const express = require("express");
require("./db/mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bookingsRouter = require("./routes/bookings");

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());
app.use(bookingsRouter);

app.listen(port, () => {
  console.log("Server is up and running on port " + port);
});
