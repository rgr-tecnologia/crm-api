/*
  Warnings:

  - You are about to drop the column `leadOportunidadeId` on the `Contrato` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contrato" DROP CONSTRAINT "Contrato_leadOportunidadeId_fkey";

-- AlterTable
ALTER TABLE "Contrato" DROP COLUMN "leadOportunidadeId";
