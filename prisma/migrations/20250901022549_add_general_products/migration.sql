/*
  Warnings:

  - You are about to drop the column `color` on the `GeneralProduct` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `GeneralProduct` table. All the data in the column will be lost.
  - You are about to drop the column `typeStamping` on the `GeneralProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GeneralProduct" DROP COLUMN "color",
DROP COLUMN "size",
DROP COLUMN "typeStamping",
ALTER COLUMN "quantity" DROP NOT NULL;
