/*
  Warnings:

  - You are about to drop the `history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "history" DROP CONSTRAINT "fk_id_client_history";

-- DropForeignKey
ALTER TABLE "history" DROP CONSTRAINT "fk_id_order_history";

-- DropForeignKey
ALTER TABLE "history" DROP CONSTRAINT "history_productId_fkey";

-- DropTable
DROP TABLE "history";
