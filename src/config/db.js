const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const MONGO_URL = process.env.MONGO_URL;


/* =========================
   Connect Function
========================= */
const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB Connection Failed ❌", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
