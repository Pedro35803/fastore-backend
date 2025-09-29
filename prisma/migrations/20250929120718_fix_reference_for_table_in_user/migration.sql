/*
  Warnings:

  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Seller` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "fk_client";

-- DropForeignKey
ALTER TABLE "Seller" DROP CONSTRAINT "fk_seller";

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "Seller";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" "RoleUser" NOT NULL,
    "status" "StatusAccount" NOT NULL DEFAULT 'ACTIVE',
    "picture" TEXT NOT NULL DEFAULT '/images/common.png',
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
    "description" TEXT NOT NULL,
    "store_active" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pk_seller" PRIMARY KEY ("id_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "index_user" ON "user"("id");

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "fk_client" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "fk_seller" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
