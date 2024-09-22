/*
  Warnings:

  - Added the required column `city` to the `Payer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
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
INSERT INTO "new_Payer" ("address", "detailAddress", "email", "id", "name", "phone", "surname", "zipCode") SELECT "address", "detailAddress", "email", "id", "name", "phone", "surname", "zipCode" FROM "Payer";
DROP TABLE "Payer";
ALTER TABLE "new_Payer" RENAME TO "Payer";
CREATE UNIQUE INDEX "Payer_email_key" ON "Payer"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
