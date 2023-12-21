/*
  Warnings:

  - The `caracteristica` column on the `Contrato` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ContratoCaracteristica" AS ENUM ('MENSALIDADE', 'PROJETO');

-- AlterTable
ALTER TABLE "Contrato" ADD COLUMN     "DataPagamento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "NumeroParcelas" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "RenovarAutomaticamente" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "caracteristica",
ADD COLUMN     "caracteristica" "ContratoCaracteristica";
