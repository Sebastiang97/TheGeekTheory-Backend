/*
  Warnings:

  - Added the required column `productId` to the `ProductPay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PrintProductPay" ALTER COLUMN "position" DROP DEFAULT,
ALTER COLUMN "size" DROP DEFAULT,
ALTER COLUMN "url" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ProductPay" ADD COLUMN     "productId" TEXT NOT NULL;
