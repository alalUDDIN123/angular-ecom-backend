const serverless = require("serverless-http");
const app = require("../src/app");
const connectDB = require("../src/config/db");

let isConnected = false;

const handler = async (event, context) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  return serverless(app)(event, context);
};

module.exports = { handler };