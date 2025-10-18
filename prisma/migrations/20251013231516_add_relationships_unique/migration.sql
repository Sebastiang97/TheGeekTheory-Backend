/*
  Warnings:

  - A unique constraint covering the columns `[colorImageId,size]` on the table `ColorImageSize` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[generalProductId,size,color]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ColorImageSize_colorImageId_size_key" ON "ColorImageSize"("colorImageId", "size");

-- CreateIndex
CREATE UNIQUE INDEX "Product_generalProductId_size_color_key" ON "Product"("generalProductId", "size", "color");
