/*
  Warnings:

  - You are about to drop the column `status` on the `ClienteRepresentante` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Contrato` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClienteRepresentante" DROP COLUMN "status",
ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Contrato" DROP COLUMN "status",
ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true;
