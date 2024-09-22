/*
  Warnings:

  - You are about to drop the column `url` on the `PrintProductPay` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Print` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "PrintImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL,
    "printId" TEXT NOT NULL,
    CONSTRAINT "PrintImage_printId_fkey" FOREIGN KEY ("printId") REFERENCES "Print" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PrintProductPayImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL,
    "printProductPayId" TEXT NOT NULL,
    CONSTRAINT "PrintProductPayImage_printProductPayId_fkey" FOREIGN KEY ("printProductPayId") REFERENCES "PrintProductPay" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PrintProductPay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "productPayId" TEXT,
    CONSTRAINT "PrintProductPay_productPayId_fkey" FOREIGN KEY ("productPayId") REFERENCES "ProductPay" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PrintProductPay" ("author", "id", "name", "productPayId") SELECT "author", "id", "name", "productPayId" FROM "PrintProductPay";
DROP TABLE "PrintProductPay";
ALTER TABLE "new_PrintProductPay" RENAME TO "PrintProductPay";
CREATE TABLE "new_Print" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL
);
INSERT INTO "new_Print" ("author", "id", "name") SELECT "author", "id", "name" FROM "Print";
DROP TABLE "Print";
ALTER TABLE "new_Print" RENAME TO "Print";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
