/*
  Warnings:

  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `SubCategoryImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `generalProductId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_subCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "SubCategoryImage" DROP CONSTRAINT "SubCategoryImage_subCategoryId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price",
ADD COLUMN     "generalProductId" TEXT NOT NULL;

-- DropTable
DROP TABLE "SubCategoryImage";

-- CreateTable
CREATE TABLE "GeneralProduct" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "typeStamping" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subCategoryId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "GeneralProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColorGeneralProduct" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ColorGeneralProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColorImage" (
    "id" TEXT NOT NULL,
    "hexColor" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "sizeId" TEXT NOT NULL,

    CONSTRAINT "ColorImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColorImageSize" (
    "id" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "colorIamgeId" TEXT NOT NULL,

    CONSTRAINT "ColorImageSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductTag" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ProductTag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_generalProductId_fkey" FOREIGN KEY ("generalProductId") REFERENCES "GeneralProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneralProduct" ADD CONSTRAINT "GeneralProduct_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneralProduct" ADD CONSTRAINT "GeneralProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorGeneralProduct" ADD CONSTRAINT "ColorGeneralProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "GeneralProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorImage" ADD CONSTRAINT "ColorImage_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "ColorGeneralProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorImageSize" ADD CONSTRAINT "ColorImageSize_colorIamgeId_fkey" FOREIGN KEY ("colorIamgeId") REFERENCES "ColorImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTag" ADD CONSTRAINT "ProductTag_productId_fkey" FOREIGN KEY ("productId") REFERENCES "GeneralProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTag" ADD CONSTRAINT "ProductTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
