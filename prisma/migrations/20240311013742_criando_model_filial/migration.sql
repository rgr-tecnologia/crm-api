/*
  Warnings:

  - You are about to drop the column `cnpj` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `ativo` on the `Contrato` table. All the data in the column will be lost.
  - You are about to drop the column `clienteId` on the `Contrato` table. All the data in the column will be lost.
  - Added the required column `filialId` to the `Contrato` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contrato" DROP CONSTRAINT "Contrato_clienteId_fkey";

-- DropIndex
DROP INDEX "Cliente_cnpj_key";

-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "cnpj";

-- AlterTable
ALTER TABLE "Contrato" DROP COLUMN "ativo",
DROP COLUMN "clienteId",
ADD COLUMN     "filialId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Filial" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "filialEnderecoId" TEXT NOT NULL,

    CONSTRAINT "Filial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilialEndereco" (
    "id" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FilialEndereco_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Filial_cnpj_key" ON "Filial"("cnpj");

-- AddForeignKey
ALTER TABLE "Filial" ADD CONSTRAINT "Filial_filialEnderecoId_fkey" FOREIGN KEY ("filialEnderecoId") REFERENCES "FilialEndereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_filialId_fkey" FOREIGN KEY ("filialId") REFERENCES "Filial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
