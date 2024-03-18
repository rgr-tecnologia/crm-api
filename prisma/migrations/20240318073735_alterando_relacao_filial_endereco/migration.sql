/*
  Warnings:

  - You are about to drop the column `oportunidadeProspeccaoId` on the `Proposta` table. All the data in the column will be lost.
  - You are about to drop the `ClienteProspeccao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OportunidadeProspeccao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PropostaOportunidadeProspeccao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RepresentanteProspeccao` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `telefone` to the `Filial` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OportunidadeProspeccao" DROP CONSTRAINT "OportunidadeProspeccao_clienteProspeccaoId_fkey";

-- DropForeignKey
ALTER TABLE "OportunidadeProspeccao" DROP CONSTRAINT "OportunidadeProspeccao_representanteProspeccaoId_fkey";

-- DropForeignKey
ALTER TABLE "Proposta" DROP CONSTRAINT "Proposta_oportunidadeProspeccaoId_fkey";

-- DropForeignKey
ALTER TABLE "PropostaOportunidadeProspeccao" DROP CONSTRAINT "PropostaOportunidadeProspeccao_oportunidadeProspeccaoId_fkey";

-- DropForeignKey
ALTER TABLE "RepresentanteProspeccao" DROP CONSTRAINT "RepresentanteProspeccao_clienteProspeccaoId_fkey";

-- AlterTable
ALTER TABLE "Filial" ADD COLUMN     "telefone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Proposta" DROP COLUMN "oportunidadeProspeccaoId";

-- DropTable
DROP TABLE "ClienteProspeccao";

-- DropTable
DROP TABLE "OportunidadeProspeccao";

-- DropTable
DROP TABLE "PropostaOportunidadeProspeccao";

-- DropTable
DROP TABLE "RepresentanteProspeccao";
