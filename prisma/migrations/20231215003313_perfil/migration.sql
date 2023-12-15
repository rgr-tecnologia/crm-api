/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";

-- CreateTable
CREATE TABLE "Perfil" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Perfil_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Perfil_userId_key" ON "Perfil"("userId");

-- AddForeignKey
ALTER TABLE "Perfil" ADD CONSTRAINT "Perfil_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
