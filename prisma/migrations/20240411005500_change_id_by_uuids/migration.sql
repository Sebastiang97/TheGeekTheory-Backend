/*
  Warnings:

  - The primary key for the `ProductImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CategoryImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Print` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CategoryProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PrintImage` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductImage" ("id", "productId", "url") SELECT "id", "productId", "url" FROM "ProductImage";
DROP TABLE "ProductImage";
ALTER TABLE "new_ProductImage" RENAME TO "ProductImage";
CREATE TABLE "new_CategoryImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "CategoryImage_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CategoryImage" ("categoryId", "id", "url") SELECT "categoryId", "id", "url" FROM "CategoryImage";
DROP TABLE "CategoryImage";
ALTER TABLE "new_CategoryImage" RENAME TO "CategoryImage";
CREATE TABLE "new_Print" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "printName" TEXT NOT NULL,
    "productId" TEXT,
    CONSTRAINT "Print_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Print" ("id", "printName", "productId") SELECT "id", "printName", "productId" FROM "Print";
DROP TABLE "Print";
ALTER TABLE "new_Print" RENAME TO "Print";
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "categoryId" TEXT NOT NULL
);
INSERT INTO "new_Product" ("categoryId", "id", "name", "price") SELECT "categoryId", "id", "name", "price" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoryName" TEXT NOT NULL
);
INSERT INTO "new_Category" ("categoryName", "id") SELECT "categoryName", "id" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE TABLE "new_CategoryProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "CategoryProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CategoryProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CategoryProduct" ("categoryId", "id", "productId") SELECT "categoryId", "id", "productId" FROM "CategoryProduct";
DROP TABLE "CategoryProduct";
ALTER TABLE "new_CategoryProduct" RENAME TO "CategoryProduct";
CREATE UNIQUE INDEX "CategoryProduct_productId_categoryId_key" ON "CategoryProduct"("productId", "categoryId");
CREATE TABLE "new_PrintImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "printId" TEXT NOT NULL,
    CONSTRAINT "PrintImage_printId_fkey" FOREIGN KEY ("printId") REFERENCES "Print" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PrintImage" ("id", "printId", "url") SELECT "id", "printId", "url" FROM "PrintImage";
DROP TABLE "PrintImage";
ALTER TABLE "new_PrintImage" RENAME TO "PrintImage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
