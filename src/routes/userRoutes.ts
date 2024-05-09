import * as UserController from "../controller/UserController";

export const userRoutes = [
  {
    method: "GET",
    path: "/users",
    handler: UserController.getUsersHandler,
  },
  {
    method: "POST",
    path: "/users",
    handler: UserController.createUserHandler,
  },
  {
    method: "PUT",
    path: "/users/{id}",
    handler: UserController.updateUserHandler,
  },
  {
    method: "DELETE",
    path: "/users/{id}",
    handler: UserController.deleteUserHandler,
  },
];
