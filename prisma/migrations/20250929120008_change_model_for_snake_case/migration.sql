/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `levelAccount` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `storeActive` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `storeName` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_active` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_name` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "createdAt",
DROP COLUMN "levelAccount",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "level_account" "LevelAccount" NOT NULL DEFAULT 'initial',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "createdAt",
DROP COLUMN "storeActive",
DROP COLUMN "storeName",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "store_active" TEXT NOT NULL,
ADD COLUMN     "store_name" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
