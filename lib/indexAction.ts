import { AppDataSource } from "../src/data-source";
import { PageInfo } from "../utils/interfaceUtility";

export async function indexAction(req, className) {
  const page: number = parseInt(req.query.page) || 1;
  const perPage: number = parseInt(req.query.perPage) || 10;
  const skip: number = (page - 1) * perPage;

  const [datas, totalCount] = await Promise.all([
    AppDataSource.manager.find(className, {
      skip,
      take: perPage,
      order: { id: "ASC" },
    }),
    AppDataSource.manager.count(className),
  ]);

  const pageInfo: PageInfo = {
    currentPage: page,
    perPage,
    totalCount,
  };

  return {
    datas,
    pageInfo,
  };
}
