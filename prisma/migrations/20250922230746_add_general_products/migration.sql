/*
  Warnings:

  - You are about to drop the column `colorIamgeId` on the `ColorImageSize` table. All the data in the column will be lost.
  - Added the required column `colorImageId` to the `ColorImageSize` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ColorImageSize" DROP CONSTRAINT "ColorImageSize_colorIamgeId_fkey";

-- AlterTable
ALTER TABLE "ColorImageSize" DROP COLUMN "colorIamgeId",
ADD COLUMN     "colorImageId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ColorImageSize" ADD CONSTRAINT "ColorImageSize_colorImageId_fkey" FOREIGN KEY ("colorImageId") REFERENCES "ColorImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
