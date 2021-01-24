const mongoose = require("mongoose");

const local = "mongodb://127.0.0.1:27017/med-buddy";
const cloud =
  "mongodb+srv://MERNCRUD:MERNCRUD@123@cluster0.w3ucu.mongodb.net/med-buddy?retryWrites=true&w=majority"; //Need to be kept in env file.
const CONNECTION_URL = cloud;

mongoose.connect(
  CONNECTION_URL,
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
