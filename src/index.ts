import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
const Hapi = require("@hapi/hapi");

const startServer = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (_, h) => {
      return h.response("Please provide a valid route").code(400);
    },
  });

  server.route({
    method: "GET",
    path: "/users",
    handler: getUsersHandler,
  });

  server.route({
    method: "POST",
    path: "/users",
    handler: createUserHandler,
  });

  server.route({
    method: "PUT",
    path: "/users/{id}",
    handler: updateUserHandler,
  });

  server.route({
    method: "DELETE",
    path: "/users/{id}",
    handler: deleteUserHandler,
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

const getUsersHandler = async (req, h) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const skip = (page - 1) * perPage;

  const [users, totalCount] = await Promise.all([
    AppDataSource.manager.find(User, {
      skip,
      take: perPage,
      order: { id: "ASC" },
    }),
    AppDataSource.manager.count(User),
  ]);

  return {
    users,
    pageInfo: {
      currentPage: page,
      perPage,
      totalCount,
    },
  };
};

const createUserHandler = async (req, h) => {
  try {
    const { firstName, lastName, age } = req.payload;

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

const updateUserHandler = async (req, h) => {
  try {
    const { firstName, lastName, age } = req.payload;
    const userId = req.params.id;

    if (!firstName || !lastName || !age || !userId) {
      return h.response("Missing required fields or ID").code(400);
    }

    const user = await AppDataSource.manager.findOneBy(User, { id: userId });
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

const deleteUserHandler = async (req, h) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return h.response("ID missing").code(400);
    }

    const user = await AppDataSource.manager.findOneBy(User, { id: userId });
    if (!user) {
      return h.response("User not found").code(404);
    }

    await AppDataSource.manager.remove(user);
    return h.response("Deleted successfully").code(200);
  } catch (err) {
    return h.response(`Internal Server Error: ${err.message}`).code(500);
  }
};

startServer();

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => console.error(error));
