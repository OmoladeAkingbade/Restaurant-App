import express, { Request, Response, NextFunction } from "express";
import Recipe from "../model/recipeModel";
import { validateRecipe } from "../validation/validation";
import APIfeatures from "../utils/apiFeatures";

export const getAllUserRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipes = await Recipe.find();
    // .populate("user");
    res.status(200).json({
      results: recipes.length,
      status: "success",
      data: {
        recipes,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

//  get all recipes that a user has created
export const getAllRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.user!;
    // const recipe = await Recipe.find({ user: _id });
    const query = Recipe.find({ user: _id });
    const features = new APIfeatures(query, req.query).paginate();
    const recipe = await features.query;

    res.status(200).json({
      results: recipe.length,
      status: "success",
      data: {
        recipe,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getRecipeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipeId } = req.params;
    const { _id } = req.user!;
    // console.log(req.params.id)

    // const { id } = req.params;
    const recipe = await Recipe.findOne({ user: _id, _id: recipeId });
    res.status(200).json({
      // results: recipe.length,
      status: "success",
      data: {
        recipe,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.user!;
    const { recipeId } = req.params;
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { user: _id, _id: recipeId },
      req.body,
      {
        new: true,
        validators: true,
      }
    );

    if (updatedRecipe === null) {
      return res.status(400).json({
        status: "fail",
        message: "recipeId not created by current user or recipe not found",
      });
    }

    res.status(201).json({
      status: "success",
      data: {
        updatedRecipe,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

export const deleteRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipeId } = req.params;
    const { _id } = req.user!;
    const deletedRecipe = await Recipe.findOneAndDelete({
      user: _id,
      _id: recipeId,
    });

    if (deletedRecipe === null) {
      return res.status(400).json({
        status: "fail",
        message: "recipeId not created by current user or recipe not found",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "invalid data sent",
    });
  }
};

//  get a particular recipe created by a user(i.e out of all the recipes created by that user, get one)
// export const getOneUserRecipeById = async (req: Request, res: Response, next: NextFunction) => {
//    try{

//     const {_id} = req.user!;
//     const recipe = await Recipe.find({user: _id, _id: recipeId});
//     res.status(200).json({
//       results: recipe.length,
//       status: "success",
//       data: {
//         recipe
//       }
//     })

//    }
//    catch(err) {

//    }
// }

// export const getOneLoggedInUserRecipes = async (req: Request, res: Response, next: NextFunction) => {

//   try{
//     if(req.user) {
//       const recipe = await Recipe.find({id: req.user.id});
//     res.status(200).json({
//       results: recipe.length,
//       status: 'success',
//       data: {
//         recipe
//       }
//     })
//     }

//   }
//   catch(err){
//     console.log(err)
//   }

// }

export const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isValid = validateRecipe.validate(req.body);
    // console.log(isValid)

    if (isValid.error) {
      return res.status(400).json({
        status: "fail",
        message: isValid.error.details[0].message,
      });
    }

    // console.log(req.user);
    // , user: req.user._id
    const newRecipe = await Recipe.create({ ...req.body, user: req.user?._id });

    res.status(201).json({
      status: "success",
      message: newRecipe,
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      status: "fail",
      message: "invalid data sent!",
    });
    // console.log(err)
  }
};
