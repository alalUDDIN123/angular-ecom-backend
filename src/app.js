
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Middleware
const cors = require('cors');
app.use(cors({ origin: '*' }))

app.get('/', (req, res) => {
  res.send('API is running....');
})

// JSON Middleware
app.use(express.json());

// export the app for use in other modules
module.exports = app;