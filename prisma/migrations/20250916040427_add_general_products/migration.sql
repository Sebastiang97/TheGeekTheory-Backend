/*
  Warnings:

  - You are about to drop the column `sizeId` on the `ColorImage` table. All the data in the column will be lost.
  - Added the required column `colorGeneralProductId` to the `ColorImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ColorImage" DROP CONSTRAINT "ColorImage_sizeId_fkey";

-- AlterTable
ALTER TABLE "ColorImage" DROP COLUMN "sizeId",
ADD COLUMN     "colorGeneralProductId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ColorImage" ADD CONSTRAINT "ColorImage_colorGeneralProductId_fkey" FOREIGN KEY ("colorGeneralProductId") REFERENCES "ColorGeneralProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
