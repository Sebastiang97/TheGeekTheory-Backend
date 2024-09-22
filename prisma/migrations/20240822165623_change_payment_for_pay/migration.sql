/*
  Warnings:

  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Payment";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Pay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "paymentId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "payerId" TEXT NOT NULL,
    CONSTRAINT "Pay_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "Payer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductPay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "size" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "payId" TEXT,
    CONSTRAINT "ProductPay_payId_fkey" FOREIGN KEY ("payId") REFERENCES "Pay" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProductPay" ("color", "description", "id", "name", "payId", "price", "quantity", "size") SELECT "color", "description", "id", "name", "payId", "price", "quantity", "size" FROM "ProductPay";
DROP TABLE "ProductPay";
ALTER TABLE "new_ProductPay" RENAME TO "ProductPay";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
