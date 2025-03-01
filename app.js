const express = require("express");
const productsRoutes = require("./routes/product.js");
const usersRoutes = require("./routes/users.js");
const auth = require("./middleware/auth");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/friki")
  .then(() => {
    console.log("conectado a la base de datos");
  })
  .catch((err) => {
    console.log("algo salio mal", err);
  });

app.post("/signup", usersRoutes);
app.post("/signin", usersRoutes);
app.use(auth);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use((req, res) => {
  res.status(500).json({ message: "Recurso Solicitado no Encontrado" });
});

app.listen(PORT, () => {
  console.log(`App corriendo en el puerto: ${PORT}`);
});
