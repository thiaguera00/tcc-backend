/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `conquest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "conquest_name_key" ON "conquest"("name");
