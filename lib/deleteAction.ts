import { AppDataSource } from "../src/data-source";

AppDataSource;
export async function deleteAction(req, className, h) {
  try {
    const dataId: number = req.params.id;

    if (!dataId) {
      return h.response("ID missing").code(400);
    }

    const data = await AppDataSource.manager.findOneBy(className, {
      id: dataId,
    });
    if (!data) {
      return h.response(`${className} Not Found`).code(404);
    }

    await AppDataSource.manager.remove(data);
    return h.response("Deleted successfully").code(200);
  } catch (err) {
    return h.response(`Internal Server Error: ${err.message}`).code(500);
  }
}
