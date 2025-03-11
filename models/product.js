const mongoose = require("mongoose");
const { default: isURL } = require("validator/lib/isURL");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  image: {
    type: String,
    required: true,
    validator: function (v) {
      return isURL(v);
    },
    message: (props) => `${props.value} No es una URL valida!`,
  },

  price: {
    type: Number,
    required: true,
    min: 1,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  buyCost: {
    type: Number,
    required: true,
  },

  typeOfProduct: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
  articuleRef: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
});

module.exports = mongoose.model("product", productSchema);
