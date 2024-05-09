import * as MovieController from "../controller/MovieController";

export const movieRoutes = [
  {
    method: "GET",
    path: "/movies",
    handler: MovieController.getMovieHandler,
  },
  {
    method: "POST",
    path: "/movies",
    handler: MovieController.createMovieHandler,
  },
  {
    method: "PUT",
    path: "/movies/{id}",
    handler: MovieController.updateMovieHandler,
  },
  {
    method: "DELETE",
    path: "/movies/{id}",
    handler: MovieController.deleteMovieHandler,
  },
];
