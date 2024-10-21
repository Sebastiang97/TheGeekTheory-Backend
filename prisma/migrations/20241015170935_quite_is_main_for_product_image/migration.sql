/*
  Warnings:

  - You are about to drop the column `isMain` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `isMain` on the `ProductPayImage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "isMain";

-- AlterTable
ALTER TABLE "ProductPayImage" DROP COLUMN "isMain";
