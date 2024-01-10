/*
  Warnings:

  - You are about to drop the column `clienteId` on the `LeadOportunidade` table. All the data in the column will be lost.
  - You are about to drop the column `clienteRepresentanteId` on the `LeadOportunidade` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "LeadOportunidade" DROP CONSTRAINT "LeadOportunidade_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "LeadOportunidade" DROP CONSTRAINT "LeadOportunidade_clienteRepresentanteId_fkey";

-- AlterTable
ALTER TABLE "LeadOportunidade" DROP COLUMN "clienteId",
DROP COLUMN "clienteRepresentanteId";
