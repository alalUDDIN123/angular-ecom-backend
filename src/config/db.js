

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.set('bufferTimeoutMS',30000)
const MONGO_URL = process.env.MONGO_URL;


/* =========================
   Connect Function
========================= */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;