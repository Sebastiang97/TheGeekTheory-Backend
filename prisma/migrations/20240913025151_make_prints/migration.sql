/*
  Warnings:

  - You are about to drop the `PrintImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductPayImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `printName` on the `Print` table. All the data in the column will be lost.
  - You are about to drop the column `productPayId` on the `Print` table. All the data in the column will be lost.
  - Added the required column `author` to the `Print` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Print` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Print` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PrintImage";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProductPayImage";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PrintProductPay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "productPayId" TEXT,
    CONSTRAINT "PrintProductPay_productPayId_fkey" FOREIGN KEY ("productPayId") REFERENCES "ProductPay" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Print" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "url" TEXT NOT NULL
);
INSERT INTO "new_Print" ("id") SELECT "id" FROM "Print";
DROP TABLE "Print";
ALTER TABLE "new_Print" RENAME TO "Print";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
