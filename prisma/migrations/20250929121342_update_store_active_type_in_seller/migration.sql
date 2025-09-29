/*
  Warnings:

  - Changed the type of `store_active` on the `seller` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "seller" DROP COLUMN "store_active",
ADD COLUMN     "store_active" BOOLEAN NOT NULL;
