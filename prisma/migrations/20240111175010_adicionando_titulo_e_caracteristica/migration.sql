/*
  Warnings:

  - Added the required column `caracteristica` to the `Contrato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Contrato` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contrato" ADD COLUMN     "caracteristica" "ContratoCaracteristica" NOT NULL,
ADD COLUMN     "titulo" TEXT NOT NULL;
