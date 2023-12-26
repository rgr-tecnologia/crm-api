/*
  Warnings:

  - You are about to drop the column `representanteId` on the `Lead` table. All the data in the column will be lost.
  - Added the required column `emailRepresentante` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeRepresentante` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefoneRepresentante` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_representanteId_fkey";

-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "representanteId",
ADD COLUMN     "emailRepresentante" TEXT NOT NULL,
ADD COLUMN     "nomeRepresentante" TEXT NOT NULL,
ADD COLUMN     "telefoneRepresentante" TEXT NOT NULL;
