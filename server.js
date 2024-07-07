import express from "express";
import propertyRoute from "./src/routes/propertyList.js";
import movieRoute from "./src/routes/mflix_movies.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import globalErrorHandler from "./src/utils/globalError.js";
import AppError from "./src/utils/appError.js";
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
app.use("/api", movieRoute);


app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`server is runnig on ${port}...`);
});
