/*
  Warnings:

  - Added the required column `clienteProspeccaoId` to the `RepresentanteProspeccao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RepresentanteProspeccao" ADD COLUMN     "clienteProspeccaoId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "RepresentanteProspeccao" ADD CONSTRAINT "RepresentanteProspeccao_clienteProspeccaoId_fkey" FOREIGN KEY ("clienteProspeccaoId") REFERENCES "ClienteProspeccao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
