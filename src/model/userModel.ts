import express, { NextFunction } from "express";
import mongoose from "mongoose";
import validator from "validator";
import { IUser } from "../utils/interface";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "A user must have an email"],
      lowercase: true,
      validate: [validator.isEmail, "A user must have a valid email"],
    },
    password: {
      type: String,
      required: [true, "A user must have a password"],
      trim: true,
      select: false,
      maxlength: [20, "A password must have less or equal to 20 characters"],
      minlength: [
        10,
        "A password name must have more or equal to 10 characters",
      ],
    },
    fullname: {
      type: String,
      required: [true, "A user must have a fullname"],
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
