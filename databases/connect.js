require("dotenv").config();
const { MONGO_URI } = process.env;
const mongoose = require("mongoose");
const startDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = startDB;
