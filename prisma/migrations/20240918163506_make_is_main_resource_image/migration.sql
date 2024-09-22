/*
  Warnings:

  - Added the required column `isMain` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ProductPayImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL,
    "productPayId" TEXT NOT NULL,
    CONSTRAINT "ProductPayImage_productPayId_fkey" FOREIGN KEY ("productPayId") REFERENCES "ProductPay" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductImage" ("id", "productId", "url") SELECT "id", "productId", "url" FROM "ProductImage";
DROP TABLE "ProductImage";
ALTER TABLE "new_ProductImage" RENAME TO "ProductImage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
