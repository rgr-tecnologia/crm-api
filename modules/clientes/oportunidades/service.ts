import { prismaConnection } from "../../../scripts/prismaConection";
import {
  OportunidadeCreate,
  OportunidadeUpdate,
} from "./dtos/oportunidade.dto";

const repository = prismaConnection.oportunidade;

export async function getAll() {
  return await repository.findMany();
}

export async function getById(id: string) {
  return await repository.findUnique({ where: { id } });
}

export async function create(data: OportunidadeCreate) {
  const validated = OportunidadeCreate.parse(data);
  return await repository.create({ data: validated });
}

export async function update(id: string, data: OportunidadeUpdate) {
  const validated = OportunidadeUpdate.parse(data);
  return await repository.update({ where: { id }, data: validated });
}

export async function remove(id: string) {
  return await repository.delete({ where: { id } });
}
