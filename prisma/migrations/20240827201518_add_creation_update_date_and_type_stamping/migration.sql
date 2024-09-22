/*
  Warnings:

  - You are about to alter the column `price` on the `ProductPay` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Int`.
  - You are about to drop the column `creation_date` on the `Pay` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeStamping` to the `ProductPay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ProductPay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Pay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeStamping` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SubCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Payer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Category" ("id", "name") SELECT "id", "name" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER'
);
INSERT INTO "new_User" ("email", "firstName", "googleId", "id", "lastName", "name", "picture", "role") SELECT "email", "firstName", "googleId", "id", "lastName", "name", "picture", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE TABLE "new_ProductPay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "typeStamping" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "payId" TEXT,
    CONSTRAINT "ProductPay_payId_fkey" FOREIGN KEY ("payId") REFERENCES "Pay" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProductPay" ("color", "description", "id", "name", "payId", "price", "quantity", "size") SELECT "color", "description", "id", "name", "payId", "price", "quantity", "size" FROM "ProductPay";
DROP TABLE "ProductPay";
ALTER TABLE "new_ProductPay" RENAME TO "ProductPay";
CREATE TABLE "new_Pay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "paymentId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "payerId" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
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
    "typeStamping" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subCategoryId" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Product_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("categoryId", "color", "description", "id", "name", "price", "quantity", "size", "subCategoryId") SELECT "categoryId", "color", "description", "id", "name", "price", "quantity", "size", "subCategoryId" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_SubCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SubCategory" ("categoryId", "code", "id", "name") SELECT "categoryId", "code", "id", "name" FROM "SubCategory";
DROP TABLE "SubCategory";
ALTER TABLE "new_SubCategory" RENAME TO "SubCategory";
CREATE TABLE "new_Payer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "detailAddress" TEXT NOT NULL,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Payer" ("address", "city", "detailAddress", "email", "id", "name", "phone", "surname", "zipCode") SELECT "address", "city", "detailAddress", "email", "id", "name", "phone", "surname", "zipCode" FROM "Payer";
DROP TABLE "Payer";
ALTER TABLE "new_Payer" RENAME TO "Payer";
CREATE UNIQUE INDEX "Payer_email_key" ON "Payer"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
