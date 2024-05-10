import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { indexAction } from "../../lib/indexAction";
import { deleteAction } from "../../lib/deleteAction";
import { validate } from "class-validator";

export const getUsersHandler = async (req, h) => {
  return indexAction(req, "User");
};

export const createUserHandler = async (req, h) => {
  try {
    const { firstName, lastName, age, email } = req.payload as User;

    if (!firstName || !lastName || !age) {
      return h.response("Missing required fields").code(400);
    }

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.age = age;
    user.email = email;
    const errors = await validate(user);

    if (errors.length > 0) {
      const errorMessage = errors.map((error) =>
        Object.values(error.constraints)
      );

      let response = {
        status: false,
        message: "Unprocessable Entity",
        data: errorMessage.flat(),
      };

      return h.response(response).code(422);
    } else {
      await AppDataSource.manager.save(user);
    }
    return h.response("Saved successfully").code(200);
  } catch (err) {
    return h.response(`Internal Server Error: ${err.message}`).code(500);
  }
};

export const updateUserHandler = async (req, h) => {
  try {
    const { firstName, lastName, age, email } = req.payload as User;
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
    user.email = email;
    const errors = await validate(user);

    if (errors.length > 0) {
      const errorMessage = errors.map((error) =>
        Object.values(error.constraints)
      );

      let response = {
        status: false,
        message: "Unprocessable Entity",
        data: errorMessage.flat(),
      };

      return h.response(response).code(422);
    } else {
      await AppDataSource.manager.save(user);
    }
    return h.response("Updated successfully").code(200);
  } catch (err) {
    return h.response(`Internal Server Error: ${err.message}`).code(500);
  }
};

export const deleteUserHandler = async (req, h) => {
  return deleteAction(req, "User", h);
};
