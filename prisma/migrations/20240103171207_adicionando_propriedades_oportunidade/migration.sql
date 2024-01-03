/*
  Warnings:

  - You are about to drop the column `DataPagamento` on the `Contrato` table. All the data in the column will be lost.
  - You are about to drop the column `NumeroParcelas` on the `Contrato` table. All the data in the column will be lost.
  - Added the required column `areaExecutora` to the `Oportunidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `caracteristica` to the `Oportunidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataFechamentoPrevista` to the `Oportunidade` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OportunidadeStatus" AS ENUM ('NEGOCIACAO', 'FECHADA', 'PERDIDA');

-- CreateEnum
CREATE TYPE "OportunidadeCaracteristica" AS ENUM ('MENSALIDADE', 'PROJETO');

-- CreateEnum
CREATE TYPE "AreaExecutora" AS ENUM ('INFRAESTRUTURA', 'DESENVOLVIMENTO', 'BUSINESS_INTELLIGENCE', 'ALOCACAO_DE_RECURSOS', 'HUNTING_DE_RECURSOS');

-- AlterTable
ALTER TABLE "Contrato" DROP COLUMN "DataPagamento",
DROP COLUMN "NumeroParcelas",
ADD COLUMN     "dataPagamento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "numeroParcelas" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Oportunidade" ADD COLUMN     "areaExecutora" "AreaExecutora" NOT NULL,
ADD COLUMN     "caracteristica" "OportunidadeCaracteristica" NOT NULL,
ADD COLUMN     "dataFechamentoPrevista" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "OportunidadeStatus" NOT NULL DEFAULT 'NEGOCIACAO';
