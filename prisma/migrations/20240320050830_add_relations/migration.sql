-- CreateTable
CREATE TABLE "CategoryProduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "CategoryProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CategoryProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Print" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "printName" TEXT NOT NULL,
    "productId" INTEGER,
    CONSTRAINT "Print_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Print" ("id", "printName") SELECT "id", "printName" FROM "Print";
DROP TABLE "Print";
ALTER TABLE "new_Print" RENAME TO "Print";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "CategoryProduct_productId_categoryId_key" ON "CategoryProduct"("productId", "categoryId");
