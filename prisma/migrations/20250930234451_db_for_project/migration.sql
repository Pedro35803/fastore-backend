-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDENT', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "Appearance" AS ENUM ('LIGHT', 'DARK');

-- CreateEnum
CREATE TYPE "StatusAccount" AS ENUM ('ACTIVE', 'INCOMPLETE', 'SUSPENDED', 'DELETED');

-- CreateEnum
CREATE TYPE "LevelAccount" AS ENUM ('initial', 'silver', 'gold');

-- CreateEnum
CREATE TYPE "RoleUser" AS ENUM ('CLIENT', 'SELLER');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" "RoleUser" NOT NULL,
    "picture" TEXT NOT NULL,
    "status" "StatusAccount" NOT NULL DEFAULT 'INCOMPLETE',
    "language" TEXT NOT NULL DEFAULT 'portuguese',
    "appearance" "Appearance" NOT NULL DEFAULT 'LIGHT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pk_user" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id_user" TEXT NOT NULL,
    "level_account" "LevelAccount" NOT NULL DEFAULT 'initial',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pk_client" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "seller" (
    "id_user" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "store_name" TEXT NOT NULL,
    "description" TEXT,
    "store_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pk_seller" PRIMARY KEY ("id_user")
);

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

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL,
    "id_product" TEXT NOT NULL,
    "id_client" TEXT NOT NULL,

    CONSTRAINT "pk_favorites" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "index_user" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cart_id_product_id_client_key" ON "cart"("id_product", "id_client");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_id_product_id_client_key" ON "favorites"("id_product", "id_client");

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

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "fk_id_client_favorites" FOREIGN KEY ("id_client") REFERENCES "client"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "fk_id_product_favorites" FOREIGN KEY ("id_product") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_id_client_order" FOREIGN KEY ("id_client") REFERENCES "client"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "fk_id_order_order_item" FOREIGN KEY ("id_order") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "fk_id_product_order_item" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
