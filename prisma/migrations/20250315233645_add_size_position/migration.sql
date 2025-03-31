/*
  Warnings:

  - Added the required column `position` to the `PrintProductPayImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `PrintProductPayImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PrintProductPayImage" ADD COLUMN     "position" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL;
