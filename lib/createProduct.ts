"use server";

import prisma from "./prisma";
import { z } from "zod";
import { redirect } from "next/navigation";
import { syncUser } from "./syncUser";

const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().nonnegative("Price must be a positive number"),
  quantity: z.coerce
    .number()
    .int()
    .min(0, "Quantity must be a positive number"),
  sku: z.string().optional(),
  lowStockAt: z.coerce
    .number()
    .int()
    .min(0, "Number must be positive")
    .optional(),
  createdAt: z.coerce.date(),
});

export type ActionState = {
  errors?: {
    name?: string[];
    quantity?: string[];
    price?: string[];
    sku?: string[];
    lowStockAt?: string[];
  };
  message?: string;
};

export const createProduct = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const user = await syncUser();
  const userId = user.id;
  const parsedData = ProductSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    sku: formData.get("sku") || undefined,
    lowStockAt: formData.get("lowStockAt") || null,
    createdAt: Date.now(),
  });

  if (!parsedData.success) {
    return { errors: parsedData.error.flatten().fieldErrors };
  }

  try {
    await prisma.product.create({
      data: { ...parsedData.data, userId },
    });
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "Failed to create product",
    };
  }
  redirect("/inventory");
};
