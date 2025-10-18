/*
  Warnings:

  - You are about to drop the column `generalProductId` on the `ColorGeneralProduct` table. All the data in the column will be lost.
  - Added the required column `generalProductId` to the `ColorGeneralProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ColorGeneralProduct" DROP CONSTRAINT "ColorGeneralProduct_generalProductId_fkey";

-- AlterTable
ALTER TABLE "ColorGeneralProduct" DROP COLUMN "generalProductId",
ADD COLUMN     "generalProductId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ColorGeneralProduct" ADD CONSTRAINT "ColorGeneralProduct_generalProductId_fkey" FOREIGN KEY ("generalProductId") REFERENCES "GeneralProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
