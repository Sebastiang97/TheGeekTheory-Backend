/*
  Warnings:

  - You are about to drop the column `productId` on the `Print` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Print" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "printName" TEXT NOT NULL,
    "productPayId" TEXT,
    CONSTRAINT "Print_productPayId_fkey" FOREIGN KEY ("productPayId") REFERENCES "ProductPay" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Print" ("id", "printName") SELECT "id", "printName" FROM "Print";
DROP TABLE "Print";
ALTER TABLE "new_Print" RENAME TO "Print";
CREATE TABLE "new_Payer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "detailAddress" TEXT NOT NULL
);
INSERT INTO "new_Payer" ("address", "city", "detailAddress", "email", "id", "name", "phone", "surname", "zipCode") SELECT "address", "city", "detailAddress", "email", "id", "name", "phone", "surname", "zipCode" FROM "Payer";
DROP TABLE "Payer";
ALTER TABLE "new_Payer" RENAME TO "Payer";
CREATE UNIQUE INDEX "Payer_email_key" ON "Payer"("email");
CREATE TABLE "new_Pay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "paymentId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "payerId" TEXT NOT NULL,
    "creation_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Pay_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "Payer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pay" ("amount", "description", "id", "payerId", "paymentId", "state") SELECT "amount", "description", "id", "payerId", "paymentId", "state" FROM "Pay";
DROP TABLE "Pay";
ALTER TABLE "new_Pay" RENAME TO "Pay";
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subCategoryId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Product_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("color", "description", "id", "name", "price", "quantity", "size", "subCategoryId") SELECT "color", "description", "id", "name", "price", "quantity", "size", "subCategoryId" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
