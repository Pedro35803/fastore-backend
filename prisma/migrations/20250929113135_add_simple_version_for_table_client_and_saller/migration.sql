-- CreateEnum
CREATE TYPE "LevelAccount" AS ENUM ('initial', 'silver', 'gold');

-- CreateTable
CREATE TABLE "Client" (
    "id_user" TEXT NOT NULL,
    "levelAccount" "LevelAccount" NOT NULL DEFAULT 'initial',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pk_client" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Seller" (
    "id_user" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "storeName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "storeActive" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pk_seller" PRIMARY KEY ("id_user")
);

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "fk_client" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "fk_seller" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
