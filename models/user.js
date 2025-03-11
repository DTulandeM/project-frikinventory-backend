const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const { default: isURL } = require("validator/lib/isURL");
const bcrypt = require("bcrypt");
const { UnauthorizedError } = require("../middleware/errorHandler");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Jhon Doe",
  },
  typeUser: {
    type: String,
    required: true,
    default: "Administrador",
    minlength: 2,
    maxlength: 30,
  },
  userImage: {
    type: String,
    required: true,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator: function (v) {
        return isURL(v);
      },
      message: (props) => `${props.value} No es una URL valida!`,
    },
  },

  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (v) {
        return isEmail(v);
      },
      message: (props) =>
        `${props.value} Formato de correo electrónico incorrecto`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
});
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError(`Incorrect email or password`)
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError(`Incorrect email or password`)
          );
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
