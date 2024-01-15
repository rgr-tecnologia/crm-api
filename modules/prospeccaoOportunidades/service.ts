import { prismaConnection } from "../../scripts/prismaConection";
import {
  OportunidadeProspeccaoDto,
  OportunidadeProspeccaoDtoCreate,
  OportunidadeProspeccaoDtoUpdate,
} from "./dtos/prospeccaoOportunidade.dto";

const repository = prismaConnection.oportunidadeProspeccao;

export async function getAll(filter: Partial<OportunidadeProspeccaoDto>) {
  return repository.findMany({
    where: filter,
  });
}

export async function getById(id: string) {
  return repository.findUnique({ where: { id } });
}

export async function create(data: OportunidadeProspeccaoDtoCreate) {
  try {
    const oportunidade = OportunidadeProspeccaoDtoCreate.parse(data);
    return repository.create({ data: oportunidade });
  } catch (error) {
    throw error;
  }
}

export async function update(
  id: string,
  data: OportunidadeProspeccaoDtoUpdate
) {
  try {
    const oportunidade = OportunidadeProspeccaoDtoUpdate.parse(data);
    return repository.update({ where: { id }, data: oportunidade });
  } catch (error) {
    throw error;
  }
}

export async function remove(id: string) {
  return repository.delete({ where: { id } });
}
