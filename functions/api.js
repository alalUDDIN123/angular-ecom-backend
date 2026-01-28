const serverless = require("serverless-http");
const dotenv = require("dotenv");
const connectDB = require("../src/config/db");
const app = require("../src/app");

dotenv.config();

let isConnected = false;

/**
 * Netlify function handler
 */
const handler = async (event, context) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  return serverless(app)(event, context);
};

module.exports = { handler };
