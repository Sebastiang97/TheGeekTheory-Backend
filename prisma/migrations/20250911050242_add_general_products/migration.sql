/*
  Warnings:

  - You are about to drop the column `hexColor` on the `ColorImage` table. All the data in the column will be lost.
  - Added the required column `color` to the `ColorImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ColorImage" DROP COLUMN "hexColor",
ADD COLUMN     "color" TEXT NOT NULL;
