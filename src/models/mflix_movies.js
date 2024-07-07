import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    _id: { type: String },
    plot: { type: String },
    genres: [
      {
        type: String,
      },
    ],
    runtime: { type: Number },
    cast: [{ type: String }],
    num_mflix_comments: { type: Number },
    title: { type: String },
    fullplot: { type: String },
    country: [
      {
        type: String,
      },
    ],
    released: { type: Date },
    directors: [{ type: String }],
    rated: { type: String },
    awards: {
      wins: { type: Number },
      nominations: { type: Number },
      text: { type: String },
    },
    lastupdated: { type: Date },
    year: { type: Number },
    imbd: {
      rating: { type: Number },
      votes: { type: Number },
      id: { type: Number },
    },
    type: { type: String },
    tomatoes: {
      viewer: {
        rating: { type: Number },
        numReviews: { type: Number },
        meter: { type: Number },
      },
    },
    lastupdated: { type: Date },
  },
  { collection: "mflix" }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
