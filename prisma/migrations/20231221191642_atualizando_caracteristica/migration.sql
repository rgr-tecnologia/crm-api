/*
  Warnings:

  - Made the column `caracteristica` on table `Contrato` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
UPDATE "Contrato" SET "caracteristica" = 'MENSALIDADE' WHERE "caracteristica" IS NULL;
ALTER TABLE "Contrato" ALTER COLUMN "caracteristica" SET NOT NULL,
ALTER COLUMN "caracteristica" SET DEFAULT 'MENSALIDADE';
