import express from "express";
import { protectRoute } from "../controllers/auth-controller";
import {
  getAllUserRecipes,
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
} from "../controllers/recipeController";

const router = express.Router();

router
  .route("/")
  .get(protectRoute, getAllUserRecipes)
  .post(protectRoute, createRecipe);

router
.route('/user')
.get(protectRoute,  getAllRecipes)


router
.route('/:recipeId')
.get(protectRoute, getRecipeById)
.put(protectRoute, updateRecipe)
.delete(protectRoute,deleteRecipe)


export default router;
