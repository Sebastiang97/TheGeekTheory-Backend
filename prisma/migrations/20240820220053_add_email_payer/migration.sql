/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Payer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Payer_email_key" ON "Payer"("email");
