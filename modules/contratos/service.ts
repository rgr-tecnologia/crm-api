import { prismaConnection } from "../../scripts/prismaConection";
import {
  ContratoDTO,
  ContratoDTOCreate,
  ContratoDTOUpdate,
} from "./dtos/contrato.dto";

const repository = prismaConnection.contrato;

export async function getContratos() {
  return await repository.findMany();
}

export async function getContrato(id: string) {
  return await repository.findUnique({
    where: {
      id,
    },
  });
}

export async function getContratoByClienteId(clienteId: string) {
  return await repository.findMany({
    where: {
      clienteId,
    },
  });
}

export async function createContrato(data: ContratoDTOCreate) {
  return await prismaConnection.$transaction(async (prisma) => {
    const oportunidade = await prisma.oportunidade.findUnique({
      where: {
        id: data.oportunidadeId,
      },
    });

    if (oportunidade?.etapa !== "NEGOCIACAO") {
      throw new Error("Oportunidade não está em negociação");
    }

    if (!oportunidade) {
      throw new Error("Oportunidade não encontrada");
    }

    await prisma.oportunidade.update({
      where: {
        id: data.oportunidadeId,
      },
      data: {
        etapa: "CONLUIDA",
      },
    });

    const validatedContrato = ContratoDTOCreate.parse(data);
    const contrato = await prisma.contrato.create({
      data: validatedContrato,
    });

    return { contrato };
  });
}

export async function updateContrato(id: string, data: ContratoDTOUpdate) {
  const validatedContrato = ContratoDTOUpdate.parse(data);
  return await repository.update({
    where: {
      id,
    },
    data: validatedContrato,
  });
}

export async function deleteContrato(id: string) {
  return await repository.delete({
    where: {
      id,
    },
  });
}
