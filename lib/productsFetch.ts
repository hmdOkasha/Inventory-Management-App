import prisma from "./prisma";
import { syncUser } from "./syncUser";

const PAGE_SIZE = 10;

const getProducts = async ({
  search,
  page,
  sortBy = "name",
  sortOrder = "asc",
}: {
  search: string;
  page: number;
  sortBy: string;
  sortOrder: string;
}) => {
  const user = await syncUser();
  const userId = user.id;

  const where = {
    userId,
    name: { contains: search, mode: "insensitive" as const },
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: { [sortBy || "createdAt"]: sortOrder || "desc" },
    }),
    prisma.product.count({ where }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return { products, total, totalPages };
};

export default getProducts;
