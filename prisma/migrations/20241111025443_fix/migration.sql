/*
  Warnings:

  - Added the required column `count_question` to the `phase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "phase" ADD COLUMN     "count_question" INTEGER NOT NULL;
