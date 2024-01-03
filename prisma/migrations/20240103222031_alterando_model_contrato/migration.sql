/*
  Warnings:

  - You are about to drop the column `caracteristica` on the `Contrato` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `Contrato` table. All the data in the column will be lost.
  - You are about to drop the column `emailEnviado` on the `Proposta` table. All the data in the column will be lost.
  - Added the required column `oportunidadeId` to the `Contrato` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contrato" DROP COLUMN "caracteristica",
DROP COLUMN "titulo",
ADD COLUMN     "oportunidadeId" TEXT NOT NULL,
ALTER COLUMN "dataPagamento" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Proposta" DROP COLUMN "emailEnviado";

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_oportunidadeId_fkey" FOREIGN KEY ("oportunidadeId") REFERENCES "Oportunidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
