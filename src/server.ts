import mongoose from "mongoose";
import { connectDB } from "./database/db";
import { connectMockDB } from "./database/db";

import app from "./app";

console.log(process.env.NODE_ENV);


const port = process.env.PORT || 3001;

// console.log(process.env.DATABASE_URL)
// const DB = process.env.DATABASE_URL?.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD!
// ) as string;

// mongoose.connect(DB).then(() => {
//   console.log("DB connection successful!");
// });

app.listen(port, () => {
  console.log(`server fired up on port ${port}`);
});
