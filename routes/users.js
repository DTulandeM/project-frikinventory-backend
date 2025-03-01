const router = require("express").Router();
const { celebrate, Joi, errors, Segments } = require("celebrate");

const {
  getUsersId,
  login,
  signUpUsers,
  updateUsers,
  updateUserImage,
} = require("../controllers/users.js");

router.get(
  "/me",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      params: Joi.object().keys({
        postId: Joi.string().alphanum().length(24).messages({
          "string.length": "El id no cumple con los requisitos.",
        }),
      }),
    }),
  }),
  getUsersId
);

router.post("/signup", signUpUsers);

router.post(
  "/signin",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email().messages({
        "string.empty": "El email es obligatorio.",
        "string.email": "Debe ser un email válido.",
      }),
      password: Joi.string().required().min(8).messages({
        "string.empty": "La contraseña es obligatoria.",
        "string.min": "La contraseña debe tener al menos 6 caracteres.",
      }),
    }),
  }),
  login
);

router.patch(
  "/me",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.empty": "El nombre es obligatorio.",
        "string.min":
          "Nombre no cumple con la longitud requerida, mínimo 6 caracteres",
        "string.max":
          "Nombre no cumple con la longitud requerida, máximo 30 caracteres",
      }),
      about: Joi.string().required().min(2).max(30).messages({
        "string.empty": "El nombre es obligatorio.",
        "string.min":
          "About no cumple con la longitud requerida, mínimo 6 caracteres",
        "string.max":
          "About no cumple con la longitud requerida, máximo 30 caracteres",
      }),
    }),
  }),
  updateUsers
);

router.patch("/me/userimage", updateUserImage);

module.exports = router;
