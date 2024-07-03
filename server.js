import express from "express";
import propertyRoute from "./src/routes/propertyList.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Database connection is successfull");
});

const port = process.env.PORT || 5000;

app.use("/api", propertyRoute);

app.listen(port, () => {
  console.log(`server is runnig on ${port}...`);
});
