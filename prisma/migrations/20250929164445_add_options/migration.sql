/*
  Warnings:

  - A unique constraint covering the columns `[id_product,id_client]` on the table `cart` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "seller" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "store_active" SET DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "cart_id_product_id_client_key" ON "cart"("id_product", "id_client");
