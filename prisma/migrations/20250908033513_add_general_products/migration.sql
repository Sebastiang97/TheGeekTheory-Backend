/*
  Warnings:

  - You are about to drop the column `productId` on the `ColorGeneralProduct` table. All the data in the column will be lost.
  - Added the required column `genreralProductId` to the `ColorGeneralProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ColorGeneralProduct" DROP CONSTRAINT "ColorGeneralProduct_productId_fkey";

-- AlterTable
ALTER TABLE "ColorGeneralProduct" DROP COLUMN "productId",
ADD COLUMN     "genreralProductId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ColorGeneralProduct" ADD CONSTRAINT "ColorGeneralProduct_genreralProductId_fkey" FOREIGN KEY ("genreralProductId") REFERENCES "GeneralProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
