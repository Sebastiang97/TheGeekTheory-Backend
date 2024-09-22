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
    CONSTRAINT "ProductPay_payId_fkey" FOREIGN KEY ("payId") REFERENCES "Payment" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProductPay" ("color", "description", "id", "name", "payId", "price", "quantity", "size") SELECT "color", "description", "id", "name", "payId", "price", "quantity", "size" FROM "ProductPay";
DROP TABLE "ProductPay";
ALTER TABLE "new_ProductPay" RENAME TO "ProductPay";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
