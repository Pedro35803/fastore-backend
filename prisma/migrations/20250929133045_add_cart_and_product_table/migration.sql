-- DropForeignKey
ALTER TABLE "client" DROP CONSTRAINT "fk_client";

-- DropForeignKey
ALTER TABLE "seller" DROP CONSTRAINT "fk_seller";

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "id_seller" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "picture" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pk_product" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "id" TEXT NOT NULL,
    "id_product" TEXT NOT NULL,
    "id_client" TEXT NOT NULL,

    CONSTRAINT "pk_cart" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "fk_id_client" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "fk_id_seller" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "fk_id_seller_product" FOREIGN KEY ("id_seller") REFERENCES "seller"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "fk_id_client_cart" FOREIGN KEY ("id_client") REFERENCES "client"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "fk_id_product_cart" FOREIGN KEY ("id_product") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
