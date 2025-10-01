/*
  Warnings:

  - Made the column `description` on table `seller` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "seller" ALTER COLUMN "description" SET NOT NULL;
