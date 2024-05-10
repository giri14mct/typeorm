import { AppDataSource } from "../data-source";
import { Comment } from "../entity/Comment";
import { Movie } from "../entity/Movie";

export const createCommentHandler = async (req, h) => {
  try {
    const { text } = req.payload as Comment;
    if (!text || !req.params.id) {
      return h.response("Missing required fields").code(400);
    }

    const movie: Movie | undefined = await AppDataSource.manager.findOneBy(
      Movie,
      { id: req.params.id }
    );

    if (!movie) {
      return h.response("Movie not found").code(404);
    }

    const comment = new Comment();
    comment.text = text;
    comment.movie = movie;
    await AppDataSource.manager.save(comment);
    return h.response("Saved successfully").code(200);
  } catch (err) {
    return h.response(`Internal Server Error: ${err.message}`).code(500);
  }
};

export const getCommentHandler = async (req, h) => {
  try {
    const customers = await AppDataSource.manager.find(Comment, {
      relations: {
        movie: true,
      },
    });
    return h.response(customers).code(200);
  } catch (err) {
    return h.response(`Internal Server Error: ${err.message}`).code(500);
  }
};
