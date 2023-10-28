const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/author");

const PORT = 4040;
const app = express();


app.use(express.json());
//ROUTES
app.use("/", postsRoute);
app.use("/", usersRoute);



mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error during db connection"));
db.once("open", () => {
  console.log("Database succesfully connected");
});
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
