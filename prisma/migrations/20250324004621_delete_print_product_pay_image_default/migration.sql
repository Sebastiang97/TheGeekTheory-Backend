/*
  Warnings:

  - You are about to drop the column `author` on the `PrintProductPay` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `PrintProductPay` table. All the data in the column will be lost.
  - You are about to drop the `PrintProductPayImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PrintProductPayImage" DROP CONSTRAINT "PrintProductPayImage_printProductPayId_fkey";

-- AlterTable
ALTER TABLE "PrintProductPay" DROP COLUMN "author",
DROP COLUMN "name",
ADD COLUMN     "position" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "size" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "url" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "PrintProductPayImage";
