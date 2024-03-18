import { OportunidadeEtapa } from "@prisma/client";
import { prismaConnection } from "../../scripts/prismaConection";
import {
  OportunidadeCreateDto,
  OportunidadeUpdateDto,
} from "./dtos/oportunidade.dto";

const repository = prismaConnection.oportunidade;

export async function getAll(clienteId?: string) {
  return repository.findMany({
    where: {
      clienteId: clienteId,
    },
  });
}

export async function getById(id: string) {
  return repository.findUnique({ where: { id } });
}

export async function create(clienteId: string, data: OportunidadeCreateDto) {
  try {
    const validated = OportunidadeCreateDto.parse({
      ...data,
      clienteId,
    });
    return repository.create({
      data: validated,
    });
  } catch (error) {
    throw error;
  }
}

export async function update(
  id: string,
  clienteId: string,
  data: OportunidadeUpdateDto
) {
  try {
    const oportunidade = await repository.findUnique({ where: { id } });

    if (!oportunidade) throw new Error("Oportunidade não encontrada");
    if (oportunidade.etapa !== "NEGOCIACAO")
      throw new Error("Oportunidade não pode ser alterada");

    const validated = OportunidadeUpdateDto.parse({
      ...data,
      clienteId,
    });
    return repository.update({ where: { id }, data: validated });
  } catch (error) {
    throw error;
  }
}

export async function remove(id: string) {
  return repository.delete({ where: { id } });
}

export async function encerrar(id: string) {
  try {
    const oportunidade = await repository.findUnique({ where: { id } });

    if (!oportunidade) throw new Error("Oportunidade não encontrada");
    if (oportunidade.etapa !== OportunidadeEtapa.NEGOCIACAO)
      throw new Error("Oportunidade não pode ser encerrada");

    return repository.update({
      where: { id },
      data: { etapa: OportunidadeEtapa.PERDIDA },
    });
  } catch (error) {
    throw error;
  }
}

export async function reabrir(id: string) {
  try {
    const oportunidade = await repository.findUnique({ where: { id } });

    if (!oportunidade) throw new Error("Oportunidade não encontrada");
    if (oportunidade.etapa !== OportunidadeEtapa.PERDIDA)
      throw new Error("Oportunidade não pode ser reaberta");

    return repository.update({
      where: { id },
      data: { etapa: "NEGOCIACAO" },
    });
  } catch (error) {
    throw error;
  }
}
