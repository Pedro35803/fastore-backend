/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chapter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChapterProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContentProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Level` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LevelProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Privilegies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reports` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserLogged` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserWork` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusAccount" AS ENUM ('ACTIVE', 'SUSPENDED', 'DELETED');

-- CreateEnum
CREATE TYPE "RoleUser" AS ENUM ('CLIENT', 'SELLER');

-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "fk_admin";

-- DropForeignKey
ALTER TABLE "ChapterProgress" DROP CONSTRAINT "fk_chapterProgress_chapter";

-- DropForeignKey
ALTER TABLE "ChapterProgress" DROP CONSTRAINT "fk_chapterProgress_user";

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "fk_content_level";

-- DropForeignKey
ALTER TABLE "ContentProgress" DROP CONSTRAINT "fk_contentProgress_content";

-- DropForeignKey
ALTER TABLE "ContentProgress" DROP CONSTRAINT "fk_contentProgress_levelProgress";

-- DropForeignKey
ALTER TABLE "Level" DROP CONSTRAINT "fk_level_chapter";

-- DropForeignKey
ALTER TABLE "LevelProgress" DROP CONSTRAINT "fk_levelProgress_chapterProgress";

-- DropForeignKey
ALTER TABLE "LevelProgress" DROP CONSTRAINT "fk_levelProgress_level";

-- DropForeignKey
ALTER TABLE "Privilegies" DROP CONSTRAINT "fk_privilegies_admin";

-- DropForeignKey
ALTER TABLE "Reports" DROP CONSTRAINT "fk_report_content";

-- DropForeignKey
ALTER TABLE "Reports" DROP CONSTRAINT "fk_report_user";

-- DropForeignKey
ALTER TABLE "UserLogged" DROP CONSTRAINT "fk_userLogged";

-- DropForeignKey
ALTER TABLE "UserWork" DROP CONSTRAINT "fk_userWork";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "RoleUser" NOT NULL,
ADD COLUMN     "status" "StatusAccount" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Chapter";

-- DropTable
DROP TABLE "ChapterProgress";

-- DropTable
DROP TABLE "Content";

-- DropTable
DROP TABLE "ContentProgress";

-- DropTable
DROP TABLE "Level";

-- DropTable
DROP TABLE "LevelProgress";

-- DropTable
DROP TABLE "Privilegies";

-- DropTable
DROP TABLE "Reports";

-- DropTable
DROP TABLE "UserLogged";

-- DropTable
DROP TABLE "UserWork";

-- DropEnum
DROP TYPE "ReportStatus";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
