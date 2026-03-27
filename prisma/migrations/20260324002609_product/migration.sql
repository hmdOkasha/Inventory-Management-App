/*
  Warnings:

  - You are about to drop the column `createAt` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Product_createAt_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Product_createdAt_idx" ON "Product"("createdAt");
