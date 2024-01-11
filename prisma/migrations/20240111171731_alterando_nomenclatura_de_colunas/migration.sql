/*
  Warnings:

  - You are about to drop the column `RenovarAutomaticamente` on the `Contrato` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contrato" DROP COLUMN "RenovarAutomaticamente",
ADD COLUMN     "renovarAutomaticamente" BOOLEAN NOT NULL DEFAULT false;
