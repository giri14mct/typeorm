import { AppDataSource } from "../data-source";
import { Movie } from "../entity/Movie";
import { indexAction } from "../../lib/indexAction";
import { deleteAction } from "../../lib/deleteAction";
import { MovieRating } from "../entity/MovieRating";

export const getMovieHandler = async (req, h) => {
  return indexAction(req, "Movie");
};

export const createMovieHandler = async (req, h) => {
  try {
    const { name, genre, year } = req.payload as Movie;

    if (!name || !genre || !year) {
      return h.response("Missing required fields").code(400);
    }

    const movie = new Movie();
    movie.name = name;
    movie.genre = genre;
    movie.year = year;
    await AppDataSource.manager.save(movie);
    return h.response("Saved successfully").code(200);
  } catch (err) {
    return h.response(`Internal Server Error: ${err.message}`).code(500);
  }
};

export const updateMovieHandler = async (req, h) => {
  try {
    const { name, genre, year } = req.payload as Movie;
    const movieId: number = req.params.id;

    if (!name || !genre || !year) {
      return h.response("Missing required fields").code(400);
    }

    const movie: Movie | undefined = await AppDataSource.manager.findOneBy(
      Movie,
      {
        id: movieId,
      }
    );
    if (!movie) {
      return h.response("Movie not found").code(404);
    }
    movie.name = name;
    movie.genre = genre;
    movie.year = year;
    await AppDataSource.manager.save(movie);
    return h.response("Updated successfully").code(200);
  } catch (err) {
    return h.response(`Internal Server Error: ${err.message}`).code(500);
  }
};

export const deleteMovieHandler = async (req, h) => {
  return deleteAction(req, "Movie", h);
};

export const addRatingHandler = async (req, h) => {
  try {
    const { rating, duration } = req.payload as MovieRating;
    const movieId: number = req.params.id;

    if (!rating || !duration || !movieId) {
      return h.response("Missing required fields").code(400);
    }

    const movie: Movie | undefined = await AppDataSource.manager.findOneBy(
      Movie,
      { id: movieId }
    );

    if (!movie) {
      return h.response("Movie not found").code(404);
    }

    const movieRating = new MovieRating();
    movieRating.rating = rating;
    movieRating.duration = duration;
    movieRating.movie = movie;
    await AppDataSource.manager.save(movieRating);
    return h.response("Updated successfully").code(200);
  } catch (err) {
    return h.response(`Internal Server Error: ${err.message}`).code(500);
  }
};
