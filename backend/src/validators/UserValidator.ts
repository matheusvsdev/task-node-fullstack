import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.min": "O nome deve ter pelo menos 3 caracteres.",
    "any.required": "O nome é obrigatório.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "O email precisa ter um formato válido.",
    "any.required": "O email é obrigatório.",
  }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$"))
    .required()
    .messages({
      "string.min": "A senha deve ter pelo menos 8 caracteres.",
      "string.pattern.base":
        "A senha deve conter letras maiúsculas, minúsculas, números e símbolos.",
      "any.required": "A senha é obrigatória.",
    }),
});
