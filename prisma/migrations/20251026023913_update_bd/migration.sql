/*
  Warnings:

  - Added the required column `ejemplo` to the `ProductTag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductTag" ADD COLUMN     "ejemplo" TEXT NOT NULL;
