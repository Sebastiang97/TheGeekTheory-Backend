/*
  Warnings:

  - You are about to drop the column `urlImage` on the `Print` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "ProductImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PrintImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "printId" INTEGER NOT NULL,
    CONSTRAINT "PrintImage_printId_fkey" FOREIGN KEY ("printId") REFERENCES "Print" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Print" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "printName" TEXT NOT NULL
);
INSERT INTO "new_Print" ("id", "printName") SELECT "id", "printName" FROM "Print";
DROP TABLE "Print";
ALTER TABLE "new_Print" RENAME TO "Print";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
