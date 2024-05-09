import { AppDataSource } from "../data-source";
import { Movie } from "../entity/Movie";

interface PageInfo {
  currentPage: number;
  perPage: number;
  totalCount: number;
}

export const getMovieHandler = async (req, h) => {
  const page: number = parseInt(req.query.page) || 1;
  const perPage: number = parseInt(req.query.perPage) || 10;
  const skip: number = (page - 1) * perPage;

  const [movies, totalCount]: [Movie[], number] = await Promise.all([
    AppDataSource.manager.find(Movie, {
      skip,
      take: perPage,
      order: { id: "ASC" },
    }),
    AppDataSource.manager.count(Movie),
  ]);

  const pageInfo: PageInfo = {
    currentPage: page,
    perPage,
    totalCount,
  };

  return {
    movies,
    pageInfo,
  };
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
  try {
    const movieId: number = req.params.id;

    if (!movieId) {
      return h.response("ID missing").code(400);
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

    await AppDataSource.manager.remove(movie);
    return h.response("Deleted successfully").code(200);
  } catch (err) {
    return h.response(`Internal Server Error: ${err.message}`).code(500);
  }
};
