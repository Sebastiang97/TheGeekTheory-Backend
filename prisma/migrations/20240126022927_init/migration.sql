-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "categoryId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Print" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "printName" TEXT NOT NULL,
    "urlImage" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_categoryId_key" ON "Product"("categoryId");
