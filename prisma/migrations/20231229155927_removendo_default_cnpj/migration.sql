-- AlterTable
ALTER TABLE "Cliente" ALTER COLUMN "cnpj" DROP DEFAULT;
DROP SEQUENCE "Cliente_cnpj_seq";
