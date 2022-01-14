import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

// const DB = process.env.DATABASE_URL?.replace(
//     "<PASSWORD>",
//     process.env.DATABASE_PASSWORD!
//   ) as string;

//   mongoose.connect(DB).then(() => {
//     console.log("DB connection successful!");
//   });

export const connectDB = () => {
  const DB = process.env.DATABASE_URL?.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD!
  ) as string;

  mongoose.connect(DB).then(() => {
    console.log("DB connection successful!");
  });
};

export const connectMockDB = () => {
  MongoMemoryServer.create().then(mongo => {
    const uri = mongo.getUri();

    mongoose.connect(uri).then(() => {
      console.log("mock db connected!");
    });
  });
};
