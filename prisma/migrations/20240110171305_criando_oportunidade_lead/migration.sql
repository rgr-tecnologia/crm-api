-- CreateEnum
CREATE TYPE "ContratoStatus" AS ENUM ('EM_ANDAMENTO', 'FINALIZADO', 'CANCELADO');

-- AlterTable
ALTER TABLE "Contrato" ADD COLUMN     "leadOportunidadeId" TEXT,
ADD COLUMN     "status" "ContratoStatus" NOT NULL DEFAULT 'EM_ANDAMENTO';

-- AlterTable
ALTER TABLE "Proposta" ADD COLUMN     "leadOportunidadeId" TEXT;

-- CreateTable
CREATE TABLE "LeadOportunidade" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "caracteristica" "OportunidadeCaracteristica" NOT NULL,
    "areaExecutora" "AreaExecutora" NOT NULL,
    "dataFechamentoPrevista" TIMESTAMP(3) NOT NULL,
    "etapa" "OportunidadeEtapa" NOT NULL DEFAULT 'NEGOCIACAO',
    "valor" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clienteId" TEXT,
    "clienteRepresentanteId" TEXT,

    CONSTRAINT "LeadOportunidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadOportunidadeProposta" (
    "id" TEXT NOT NULL,
    "tipo" "TipoProposta" NOT NULL,
    "versao" TEXT NOT NULL,
    "dataEnvio" TIMESTAMP(3) NOT NULL,
    "comissao" DOUBLE PRECISION NOT NULL,
    "leadOportunidadeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeadOportunidadeProposta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_leadOportunidadeId_fkey" FOREIGN KEY ("leadOportunidadeId") REFERENCES "LeadOportunidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadOportunidade" ADD CONSTRAINT "LeadOportunidade_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadOportunidade" ADD CONSTRAINT "LeadOportunidade_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadOportunidade" ADD CONSTRAINT "LeadOportunidade_clienteRepresentanteId_fkey" FOREIGN KEY ("clienteRepresentanteId") REFERENCES "ClienteRepresentante"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadOportunidadeProposta" ADD CONSTRAINT "LeadOportunidadeProposta_leadOportunidadeId_fkey" FOREIGN KEY ("leadOportunidadeId") REFERENCES "LeadOportunidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposta" ADD CONSTRAINT "Proposta_leadOportunidadeId_fkey" FOREIGN KEY ("leadOportunidadeId") REFERENCES "LeadOportunidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
