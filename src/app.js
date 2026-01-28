const express = require("express"); 
const cors=require("cors");
const app = express();

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");

/* =========================
   Middlewares
========================= */
app.use(cors({
  origin: "*",
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   Home Route
========================= */
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Angular E-Commerce Backend</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #0f172a;
            color: #e5e7eb;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
          .box {
            background: #020617;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 0 15px rgba(0,0,0,0.5);
          }
          h1 {
            color: #38bdf8;
          }
          p {
            margin-top: 10px;
            color: #cbd5f5;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>🚀 Angular E-Commerce Backend</h1>
          <p>Server is running successfully</p>
          <p>Use <b>/api</b> routes to access resources</p>
        </div>
      </body>
    </html>
  `);
});

app.get("/api", (req, res) => {
  res.json({ message: "Angular E-Commerce Backend running 🚀" });
});

/* =========================
   API Routes
========================= */
app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);

/* =========================
   404 Not Found Handler
========================= */
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl
  });
});

/* =========================
   Global Error Handler
========================= */
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

module.exports = app;
