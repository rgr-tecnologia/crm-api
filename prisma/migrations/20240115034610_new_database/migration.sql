-- CreateEnum
CREATE TYPE "ContratoStatus" AS ENUM ('EM_ANDAMENTO', 'FINALIZADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "ContratoCaracteristica" AS ENUM ('MENSALIDADE', 'PROJETO');

-- CreateEnum
CREATE TYPE "OportunidadeEtapa" AS ENUM ('NEGOCIACAO', 'PERDIDA', 'CONGELADO', 'CONTRATO_ENVIADO', 'CONLUIDA');

-- CreateEnum
CREATE TYPE "OportunidadeCaracteristica" AS ENUM ('MENSALIDADE', 'PROJETO');

-- CreateEnum
CREATE TYPE "AreaExecutora" AS ENUM ('INFRAESTRUTURA', 'DESENVOLVIMENTO', 'BUSINESS_INTELLIGENCE', 'ALOCACAO_DE_RECURSOS', 'HUNTING_DE_RECURSOS');

-- CreateEnum
CREATE TYPE "TipoProposta" AS ENUM ('PROPOSTA_TECNICA_COMERCIAL', 'CONTRATO', 'ADITIVO');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "nomeFantasia" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClienteRepresentante" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "telefone" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClienteRepresentante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contrato" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "oportunidadeId" TEXT NOT NULL,
    "representanteId" TEXT NOT NULL,
    "caracteristica" "ContratoCaracteristica" NOT NULL,
    "titulo" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "numeroParcelas" INTEGER NOT NULL DEFAULT 0,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFimPrevista" TIMESTAMP(3) NOT NULL,
    "dataPagamento" TIMESTAMP(3) NOT NULL,
    "renovarAutomaticamente" BOOLEAN NOT NULL DEFAULT false,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "status" "ContratoStatus" NOT NULL DEFAULT 'EM_ANDAMENTO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contrato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Oportunidade" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "representanteId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "caracteristica" "OportunidadeCaracteristica" NOT NULL,
    "areaExecutora" "AreaExecutora" NOT NULL,
    "dataFechamentoPrevista" TIMESTAMP(3) NOT NULL,
    "etapa" "OportunidadeEtapa" NOT NULL DEFAULT 'NEGOCIACAO',
    "valor" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Oportunidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposta" (
    "id" TEXT NOT NULL,
    "tipo" "TipoProposta" NOT NULL,
    "versao" TEXT NOT NULL,
    "dataEnvio" TIMESTAMP(3) NOT NULL,
    "comissao" DOUBLE PRECISION NOT NULL,
    "oportunidadeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "oportunidadeProspeccaoId" TEXT,

    CONSTRAINT "Proposta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "nomeFantasia" TEXT NOT NULL,
    "nomeRepresentante" TEXT NOT NULL,
    "telefoneRepresentante" TEXT NOT NULL,
    "emailRepresentante" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClienteProspeccao" (
    "id" TEXT NOT NULL,
    "nomeFantasia" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
    "etapa" "OportunidadeEtapa" NOT NULL DEFAULT 'NEGOCIACAO',
    "dataFechamentoPrevista" TIMESTAMP(3) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OportunidadeProspeccao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RepresentanteProspeccao" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "telefone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RepresentanteProspeccao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropostaOportunidadeProspeccao" (
    "id" TEXT NOT NULL,
    "oportunidadeProspeccaoId" TEXT NOT NULL,
    "tipo" "TipoProposta" NOT NULL,
    "versao" TEXT NOT NULL,
    "dataEnvio" TIMESTAMP(3) NOT NULL,
    "comissao" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropostaOportunidadeProspeccao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perfil" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Perfil_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cnpj_key" ON "Cliente"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_username_key" ON "Usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Perfil_usuarioId_key" ON "Perfil"("usuarioId");

-- AddForeignKey
ALTER TABLE "ClienteRepresentante" ADD CONSTRAINT "ClienteRepresentante_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_oportunidadeId_fkey" FOREIGN KEY ("oportunidadeId") REFERENCES "Oportunidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_representanteId_fkey" FOREIGN KEY ("representanteId") REFERENCES "ClienteRepresentante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Oportunidade" ADD CONSTRAINT "Oportunidade_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Oportunidade" ADD CONSTRAINT "Oportunidade_representanteId_fkey" FOREIGN KEY ("representanteId") REFERENCES "ClienteRepresentante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposta" ADD CONSTRAINT "Proposta_oportunidadeId_fkey" FOREIGN KEY ("oportunidadeId") REFERENCES "Oportunidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposta" ADD CONSTRAINT "Proposta_oportunidadeProspeccaoId_fkey" FOREIGN KEY ("oportunidadeProspeccaoId") REFERENCES "OportunidadeProspeccao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OportunidadeProspeccao" ADD CONSTRAINT "OportunidadeProspeccao_clienteProspeccaoId_fkey" FOREIGN KEY ("clienteProspeccaoId") REFERENCES "ClienteProspeccao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OportunidadeProspeccao" ADD CONSTRAINT "OportunidadeProspeccao_representanteProspeccaoId_fkey" FOREIGN KEY ("representanteProspeccaoId") REFERENCES "RepresentanteProspeccao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropostaOportunidadeProspeccao" ADD CONSTRAINT "PropostaOportunidadeProspeccao_oportunidadeProspeccaoId_fkey" FOREIGN KEY ("oportunidadeProspeccaoId") REFERENCES "OportunidadeProspeccao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perfil" ADD CONSTRAINT "Perfil_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
