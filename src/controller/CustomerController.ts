import { AppDataSource } from "../data-source";
import { Customer } from "../entity/Customer";
import { Movie } from "../entity/Movie";

export const createCustomerHandler = async (req, h) => {
  try {
    const { name } = req.payload as Customer;
    if (!name || !req.params.id) {
      return h.response("Missing required fields").code(400);
    }

    const movie: Movie | undefined = await AppDataSource.manager.findOneBy(
      Movie,
      { id: req.params.id }
    );

    if (!movie) {
      return h.response("Movie not found").code(404);
    }

    const customer = new Customer();
    customer.name = name;
    customer.movies = [movie];
    await AppDataSource.manager.save(customer);
    return h.response("Saved successfully").code(200);
  } catch (err) {
    return h.response(`Internal Server Error: ${err.message}`).code(500);
  }
};

export const getCustomerHandler = async (req, h) => {
  try {
    const customers = await AppDataSource.manager.find(Customer, {
      select: {
        name: true,
      },
      relations: {
        movies: true,
      },
    });

    return h.response(customers).code(200);
  } catch (err) {
    return h.response(`Internal Server Error: ${err.message}`).code(500);
  }
};
