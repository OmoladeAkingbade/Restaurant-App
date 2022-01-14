import Joi from "joi";
import { IRecipe, IUser, IIngredient } from "../utils/interface";

let ingredients = Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.number().required(),
});

export const validateRecipe = Joi.object({
  title: Joi.string().required().trim(),
  meal_type: Joi.string().required().trim(),
  difficulty_level: Joi.string().required().trim(),
  ingredients: Joi.array().items(ingredients),
  preparation: Joi.string().required(),
});

export const validateUserSignUp = Joi.object({
  email: Joi.string().email().trim(),
  password: Joi.string()
    .required()
    .min(10)
    .max(20)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  fullname: Joi.string().required().trim().min(1).max(50),
});

export const validateUserLogin = Joi.object({
  email: Joi.string().email().trim(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

export const validateIngredient = Joi.object({
  name: Joi.string().required().trim(),
  price: Joi.number().required(),
  recipe: Joi.string().trim(),
  user: Joi.string().required(),
});
//   title: string,
//     meal_type: string,
//     difficulty_level: string,
//     ingredients: string,
//     preparation: string,
//     created_At: any,
//     updated_At: any
