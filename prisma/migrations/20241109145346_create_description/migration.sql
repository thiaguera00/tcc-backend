/*
  Warnings:

  - Added the required column `description` to the `phase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "phase" ADD COLUMN     "description" TEXT NOT NULL;
