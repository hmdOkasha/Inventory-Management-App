import prisma from "./prisma";

const PAGE_SIZE = 10;

const getProducts = async ({
  search,
  page,
}: {
  search: string;
  page: number;
}) => {
  const where = { name: { contains: search, mode: "insensitive" as const } };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return { products, total, totalPages };
};

export default getProducts;
