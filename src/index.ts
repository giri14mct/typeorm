import { AppDataSource } from "./data-source";
import * as Hapi from "@hapi/hapi";
import { userRoutes } from "./routes/userRoutes";
import { movieRoutes } from "./routes/movieRoutes";
import { customerRoutes } from "./routes/customerRoutes";
import { commentRoutes } from "./routes/commentRoutes";

type Route = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  handler: (req: any, h: any) => Promise<any>;
};
const startServer = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  const routes = [
    ...userRoutes,
    ...movieRoutes,
    ...customerRoutes,
    ...commentRoutes,
  ];
  routes.forEach((route: Route) => {
    server.route(route);
  });

  server.route({
    method: "*",
    path: "/{any*}",
    handler: (_, h) => {
      return h.response("Route Not Found").code(404);
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

startServer();

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => console.error(error));
