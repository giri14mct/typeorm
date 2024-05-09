import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

interface PageInfo {
  currentPage: number;
  perPage: number;
  totalCount: number;
}

export const getUsersHandler = async (req, h) => {
  const page: number = parseInt(req.query.page) || 1;
  const perPage: number = parseInt(req.query.perPage) || 10;
  const skip: number = (page - 1) * perPage;

  const [users, totalCount]: [User[], number] = await Promise.all([
    AppDataSource.manager.find(User, {
      skip,
      take: perPage,
      order: { id: "ASC" },
    }),
    AppDataSource.manager.count(User),
  ]);

  const pageInfo: PageInfo = {
    currentPage: page,
    perPage,
    totalCount,
  };

  return {
    users,
    pageInfo,
  };
};

export const createUserHandler = async (req, h) => {
  try {
    const { firstName, lastName, age } = req.payload as User;

    if (!firstName || !lastName || !age) {
      return h.response("Missing required fields").code(400);
    }

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.age = age;
    await AppDataSource.manager.save(user);
    return h.response("Saved successfully").code(200);
  } catch (err) {
    return h.response(`Internal Server Error: ${err.message}`).code(500);
  }
};

export const updateUserHandler = async (req, h) => {
  try {
    const { firstName, lastName, age } = req.payload as User;
    const userId: number = req.params.id;

    if (!firstName || !lastName || !age || !userId) {
      return h.response("Missing required fields or ID").code(400);
    }

    const user: User | undefined = await AppDataSource.manager.findOneBy(User, {
      id: userId,
    });
    if (!user) {
      return h.response("User not found").code(404);
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.age = age;

    await AppDataSource.manager.save(user);
    return h.response("Updated successfully").code(200);
  } catch (err) {
    return h.response(`Internal Server Error: ${err.message}`).code(500);
  }
};

export const deleteUserHandler = async (req, h) => {
  try {
    const userId: number = req.params.id;

    if (!userId) {
      return h.response("ID missing").code(400);
    }

    const user: User | undefined = await AppDataSource.manager.findOneBy(User, {
      id: userId,
    });
    if (!user) {
      return h.response("User not found").code(404);
    }

    await AppDataSource.manager.remove(user);
    return h.response("Deleted successfully").code(200);
  } catch (err) {
    return h.response(`Internal Server Error: ${err.message}`).code(500);
  }
};
