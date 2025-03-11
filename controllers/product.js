const product = require("../models/product.js");
ERROR_CODE = Object.freeze({
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
});

module.exports.getProducts = (req, res) => {
  product
    .find()
    .populate("owner")
    .exec()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res
        .status(ERROR_CODE.INTERNAL_SERVER)
        .send({ message: "Error del servidor" + err });
    });
};
module.exports.createProducts = (req, res) => {
  const { name, image, price, quantity, buyCost, typeOfProduct, articuleRef } =
    req.body;
  const owner = req.user._id;
  product
    .create({
      name,
      image,
      price,
      quantity,
      owner,
      buyCost,
      typeOfProduct,
      articuleRef,
    })
    .then((product) => product.populate("owner"))
    .then((product) => res.send(product))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(ERROR_CODE.BAD_REQUEST).send({
          message: "Los datos no son suficientes para crear un producto",
        });
      }
      res
        .status(ERROR_CODE.INTERNAL_SERVER)
        .send({ message: "Error del servidor" });
    });
};

module.exports.deleteProduct = (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  product
    .findByIdAndDelete(_id)
    .orFail(() => {
      const error = new Error("No se ha encontrado un producto con esa id");
      error.statusCode = ERROR_CODE.NOT_FOUND;
      throw error;
    })
    .then(() => {
      return res.send({ message: "Producto eliminado con exito" });
    })
    .catch((error) => {
      if (error.statusCode === ERROR_CODE.NOT_FOUND) {
        return res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: error.message });
      }
      if (error.name === "CastError") {
        return res
          .status(ERROR_CODE.BAD_REQUEST)
          .send({ message: "ID de carta no válido" });
      }
      return res
        .status(ERROR_CODE.INTERNAL_SERVER)
        .send({ message: "Error del servidor" });
    });
};

module.exports.updateProduct = (req, res) => {
  const {
    id,
    name,
    image,
    price,
    quantity,
    buyCost,
    typeOfProduct,
    articuleRef,
  } = req.body;
  product
    .findByIdAndUpdate(
      id,
      {
        name,
        image,
        price,
        quantity,
        buyCost,
        typeOfProduct,
        articuleRef,
      },
      { returnDocument: "after", runValidators: true, new: true }
    )
    .then((product) => {
      if (!product) {
        return res.status(ERROR_CODE.NOT_FOUND).send({
          message: "Producto no encontrado",
        });
      }
      res.send(product);
    })
    .catch((err) => {
      res
        .status(ERROR_CODE.INTERNAL_SERVER)
        .send({ message: "Error del servidor" });
    });
};
