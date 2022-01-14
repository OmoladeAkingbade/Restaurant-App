import mongoose from "mongoose";

export interface IRecipe {
  id: any;
  title: string;
  meal_type: string;
  difficulty_level: string;
  ingredients: string;
  preparation: string;
  created_At: any;
  updated_At: any;
  user: IUser;
}

export interface IUser extends mongoose.Document {
  password: string;
  fullname: string;
  created_At: Date;
  updated_At: Date;
  email: string;
}

export interface IIngredient {
  name: string;
  price: number;
  recipe: string;
}
