const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://127.0.0.1:27017/med-buddy",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) return console.log("Successfully connected to DB.");
    console.log("Error connecting to DB");
  }
);
