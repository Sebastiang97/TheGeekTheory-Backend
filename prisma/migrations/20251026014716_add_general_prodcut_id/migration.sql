/*
  Warnings:

  - You are about to drop the column `productId` on the `ProductTag` table. All the data in the column will be lost.
  - Added the required column `generalProductId` to the `ProductTag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductTag" DROP CONSTRAINT "ProductTag_productId_fkey";

-- AlterTable
ALTER TABLE "ProductTag" DROP COLUMN "productId",
ADD COLUMN     "generalProductId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductTag" ADD CONSTRAINT "ProductTag_generalProductId_fkey" FOREIGN KEY ("generalProductId") REFERENCES "GeneralProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
