import express from 'express';
import filtterMovieByYear from '../controllers/mflix_movies.controller.js';

const router = express.Router();


router.get("/movie", filtterMovieByYear);


export default router;