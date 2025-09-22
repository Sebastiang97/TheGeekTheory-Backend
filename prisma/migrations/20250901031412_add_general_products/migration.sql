/*
  Warnings:

  - Added the required column `isVisible` to the `GeneralProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GeneralProduct" ADD COLUMN     "isVisible" BOOLEAN NOT NULL;
