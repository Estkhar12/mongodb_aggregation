import Movie from "../models/mflix_movies.js";

const filtterMovieByYear = async (req, res) => {
  try {
    const { year, currentPage = 1, perPage = 20 } = req.query;
    const skip = (currentPage - 1) * perPage;

    if (!year) {
      return res
        .status(400)
        .json({ message: "Provided year to not filtter the monvies!" });
    }

    const movie = await Movie.aggregate([
      {
        $match: { year: parseInt(year) },
      },
      {
        $lookup: {
          from: "mflix_comments",
          localField: "_id",
          foreignField: "movie_id",
          as: "comments",
        },
      },
      {
        $sort: {
          title: 1,
        },
      },
      {
        $skip: skip,
      },

      {
        $limit: parseInt(perPage),
      },
      {
        $project: {
          id: 1,
          year: 1,
          title: 1,
          rated: 1,
          comments: 1
        },
      },
    ]);
    res.status(200).json({
      currentPage: +currentPage,
      perPage: +perPage,
      movie,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export default filtterMovieByYear;
