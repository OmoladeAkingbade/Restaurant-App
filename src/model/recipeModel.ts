import { string } from "joi";
import mongoose, { Schema, Document } from "mongoose";
import { IRecipe } from "../utils/interface";

const recipeSchema: Schema<IRecipe> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A recipe must have a title"],
      trim: true,
    },
    meal_type: {
      type: String,
      required: [true, "A recipe must have a meal type"],
      trim: true,
      enum: {
        values: ["breakfast", "lunch", "supper", "snack"],
        message:
          "meal type should only be either breakfast, lunch, supper or snack",
      },
    },
    difficulty_level: {
      type: String,
      required: [true, "A recipe must have a difficulty level"],
      enum: {
        values: ["beginner", "intermediate", "advanced"],
        message:
          " difficulty level should only be either beginner, intermediate or advanced ",
      },
    },
    ingredients: [
      {
        name: { type: String },
        price: { type: Number },
      },
    ],
    preparation: {
      type: String,
      required: [true, "A recipe must have preparation guidelines"],
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "a user must be provided"],
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
