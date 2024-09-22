/*
  Warnings:

  - You are about to drop the column `currentProvider` on the `User` table. All the data in the column will be lost.
  - Added the required column `googleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "googleId" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "firstName", "id", "lastName", "name", "picture") SELECT "email", "firstName", "id", "lastName", "name", "picture" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
