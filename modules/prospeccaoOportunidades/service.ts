import { prismaConnection } from "../../scripts/prismaConection";
import {
  OportunidadeProspeccaoDtoCreate,
  OportunidadeProspeccaoDtoUpdate,
} from "./dtos/prospeccaoOportunidade.dto";

const repository = prismaConnection.oportunidadeProspeccao;

export async function getAll() {
  return await repository.findMany();
}

export async function getById(id: string) {
  return await repository.findUnique({ where: { id } });
}

export async function create(data: OportunidadeProspeccaoDtoCreate) {
  try {
    const oportunidade = OportunidadeProspeccaoDtoCreate.parse(data);
    return repository.create({ data: oportunidade });
  } catch (error) {
    console.log(error);
  }
}

export async function update(
  id: string,
  data: OportunidadeProspeccaoDtoUpdate
) {
  try {
    const oportunidade = OportunidadeProspeccaoDtoUpdate.parse(data);
    return await repository.update({ where: { id }, data: oportunidade });
  } catch (error) {
    console.log(error);
  }
}

export async function remove(id: string) {
  return await repository.delete({ where: { id } });
}
