-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDENT', 'COMPLETED', 'CANCELED');

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL,
    "id_product" TEXT NOT NULL,
    "id_client" TEXT NOT NULL,

    CONSTRAINT "pk_favorites" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history" (
    "id" TEXT NOT NULL,
    "id_order" TEXT NOT NULL,
    "id_client" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "pk_history" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "id_client" TEXT NOT NULL,
    "total_price" DECIMAL(65,30) NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDENT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pk_order" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "id" TEXT NOT NULL,
    "id_order" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_order_item" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "favorites_id_product_id_client_key" ON "favorites"("id_product", "id_client");

-- CreateIndex
CREATE UNIQUE INDEX "history_id_order_id_client_key" ON "history"("id_order", "id_client");

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "fk_id_client_favorites" FOREIGN KEY ("id_client") REFERENCES "client"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "fk_id_product_favorites" FOREIGN KEY ("id_product") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "fk_id_client_history" FOREIGN KEY ("id_client") REFERENCES "client"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "fk_id_order_history" FOREIGN KEY ("id_order") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_id_client_order" FOREIGN KEY ("id_client") REFERENCES "client"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "fk_id_order_order_item" FOREIGN KEY ("id_order") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "fk_id_product_order_item" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
