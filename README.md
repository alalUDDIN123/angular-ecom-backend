
### One go complete folder and files structure created
```
New-Item -ItemType Directory -Path "src/config","src/models","src/routes","src/controllers" -Force;
New-Item -ItemType File -Path "src/config/db.js","src/models/User.js","src/models/Product.js","src/models/Cart.js","src/routes/auth.routes.js","src/routes/product.routes.js","src/routes/cart.routes.js","src/controllers/auth.controller.js","src/controllers/product.controller.js","src/controllers/cart.controller.js","src/app.js","src/server.js"
```