/*
  Warnings:

  - Added the required column `valor` to the `Oportunidade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Oportunidade" ADD COLUMN     "valor" DOUBLE PRECISION NOT NULL;
