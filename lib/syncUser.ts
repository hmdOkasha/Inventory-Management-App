import { redirect } from "next/navigation";
import { stackServerApp } from "./../stack/server";
import prisma from "@/lib/prisma";

export async function syncUser() {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/");
  }

  await prisma.user.upsert({
    where: { email: user.primaryEmail ?? "" },
    update: {},
    create: {
      email: user.primaryEmail ?? "",
      name: user.displayName ?? "",
    },
  });

  return user;
}
