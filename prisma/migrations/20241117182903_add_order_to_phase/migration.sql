/*
  Warnings:

  - Added the required column `order` to the `phase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "phase" ADD COLUMN     "order" INTEGER NOT NULL;
