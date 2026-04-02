import dotenv from "dotenv";

if (process.env.NODE_ENV != "production") {
  dotenv.config();
}

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";

const app = express();

main()
  .then(() => {
    console.log("connected to Database");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

app.get("/", (req, res) => {
  res.json("wroking ");
});

app.use(userRoutes);
app.use(postRoutes);

app.listen(8080, () => {
  console.log("server running on port 8080");
});
