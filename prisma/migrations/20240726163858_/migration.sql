/*
  Warnings:

  - A unique constraint covering the columns `[profilePhotoId]` on the table `DataUserGame` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DataUserGame_profilePhotoId_key" ON "DataUserGame"("profilePhotoId");
