-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "isLogging" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_User" ("email", "firstName", "googleId", "id", "lastName", "name", "picture") SELECT "email", "firstName", "googleId", "id", "lastName", "name", "picture" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
