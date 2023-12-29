/*
  Warnings:

  - You are about to drop the column `name` on the `Perfil` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Perfil` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usuarioId]` on the table `Perfil` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nome` to the `Perfil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Perfil` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Perfil" DROP CONSTRAINT "Perfil_userId_fkey";

-- DropIndex
DROP INDEX "Perfil_userId_key";

-- AlterTable
ALTER TABLE "Perfil" DROP COLUMN "name",
DROP COLUMN "userId",
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "usuarioId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Perfil_usuarioId_key" ON "Perfil"("usuarioId");

-- AddForeignKey
ALTER TABLE "Perfil" ADD CONSTRAINT "Perfil_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
