-- AlterTable
ALTER TABLE "Proposta" ADD COLUMN     "oportunidadeProspeccaoId" TEXT;

-- CreateTable
CREATE TABLE "ClienteProspeccao" (
    "id" TEXT NOT NULL,
    "nomeFantasia" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ClienteProspeccao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OportunidadeProspeccao" (
    "id" TEXT NOT NULL,
    "clienteProspeccaoId" TEXT NOT NULL,
    "representanteProspeccaoId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "caracteristica" "OportunidadeCaracteristica" NOT NULL,
    "areaExecutora" "AreaExecutora" NOT NULL,
    "dataFechamentoPrevista" TIMESTAMP(3) NOT NULL,
    "etapa" "OportunidadeEtapa" NOT NULL DEFAULT 'NEGOCIACAO',
    "valor" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OportunidadeProspeccao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RepresentanteOportunidadeProspeccao" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "telefone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RepresentanteOportunidadeProspeccao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Proposta" ADD CONSTRAINT "Proposta_oportunidadeProspeccaoId_fkey" FOREIGN KEY ("oportunidadeProspeccaoId") REFERENCES "OportunidadeProspeccao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OportunidadeProspeccao" ADD CONSTRAINT "OportunidadeProspeccao_clienteProspeccaoId_fkey" FOREIGN KEY ("clienteProspeccaoId") REFERENCES "ClienteProspeccao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OportunidadeProspeccao" ADD CONSTRAINT "OportunidadeProspeccao_representanteProspeccaoId_fkey" FOREIGN KEY ("representanteProspeccaoId") REFERENCES "RepresentanteOportunidadeProspeccao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
