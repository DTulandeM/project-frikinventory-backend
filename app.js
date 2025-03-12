const express = require("express");
const productsRoutes = require("./routes/product.js");
const usersRoutes = require("./routes/users.js");
const auth = require("./middleware/auth");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { isCelebrateError } = require("celebrate");
const { requestLogger, errorLogger } = require("./middleware/logger");

const { PORT = 3000 } = process.env;

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://friki.mooo.com",
    "https://www.friki.mooo.com",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

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

app.use(requestLogger);
app.post("/signup", usersRoutes);
app.post("/signin", usersRoutes);
app.use(auth);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use(errorLogger);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (isCelebrateError(err)) {
    const validationError = err.details.get("body");
    const errorMessage = validationError
      ? validationError.details[0].message
      : "Error de validación";

    return res.status(400).json({
      status: "error",
      message: errorMessage,
    });
  }
  if (err.name === "CastError") {
    return res.status(404).send({ message: "ID de usuario no válido" });
  }
  if (err.name === "ValidationError") {
    return res.status(404).send({
      message: "Los datos no son suficientes para actualizar el usuario",
    });
  }
  res.status(statusCode).send({
    message:
      statusCode === 500 ? "Se ha producido un error en el servidor" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App corriendo en el puerto: ${PORT}`);
});
