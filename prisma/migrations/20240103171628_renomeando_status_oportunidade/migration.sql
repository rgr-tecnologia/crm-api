/*
  Warnings:

  - You are about to drop the column `status` on the `Oportunidade` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "OportunidadeEtapa" AS ENUM ('NEGOCIACAO', 'FECHADA', 'PERDIDA');

-- AlterTable
ALTER TABLE "Oportunidade" DROP COLUMN "status",
ADD COLUMN     "etapa" "OportunidadeEtapa" NOT NULL DEFAULT 'NEGOCIACAO';

-- DropEnum
DROP TYPE "OportunidadeStatus";
