/*
  Warnings:

  - Added the required column `clienteId` to the `Filial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clienteId` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Filial" ADD COLUMN     "clienteId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "clienteId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Filial" ADD CONSTRAINT "Filial_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
