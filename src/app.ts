import express, { Application, Request, Response, NextFunction } from "express";
import recipeRouter from "./routes/recipeRoute";
import userRouter from "./routes/userRoute";
import { connectMockDB } from "./database/db";
import { connectDB } from "./database/db";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());


if (process.env.NODE_ENV === "test") {
    connectMockDB();
  } else {
    connectDB();
  }
  

app.use("/api/v1/recipes", recipeRouter);
app.use("/api/v1/users", userRouter);

export default app;

