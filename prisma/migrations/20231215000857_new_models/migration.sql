-- CreateEnum
CREATE TYPE "TipoProposta" AS ENUM ('PROPOSTA_TECNICA_COMERCIAL', 'CONTRATO', 'ADITIVO');

-- CreateTable
CREATE TABLE "Oportunidade" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "representanteId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,

    CONSTRAINT "Oportunidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposta" (
    "id" TEXT NOT NULL,
    "tipo" "TipoProposta" NOT NULL,
    "versao" TEXT NOT NULL,
    "dataEnvio" TIMESTAMP(3) NOT NULL,
    "emailEnviado" BOOLEAN NOT NULL,
    "comissao" DOUBLE PRECISION NOT NULL,
    "oportunidadeId" TEXT NOT NULL,

    CONSTRAINT "Proposta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "representanteId" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Oportunidade" ADD CONSTRAINT "Oportunidade_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Oportunidade" ADD CONSTRAINT "Oportunidade_representanteId_fkey" FOREIGN KEY ("representanteId") REFERENCES "ClienteRepresentante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposta" ADD CONSTRAINT "Proposta_oportunidadeId_fkey" FOREIGN KEY ("oportunidadeId") REFERENCES "Oportunidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_representanteId_fkey" FOREIGN KEY ("representanteId") REFERENCES "ClienteRepresentante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
