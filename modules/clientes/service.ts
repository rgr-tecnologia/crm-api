import { ClienteDto } from "./dtos/cliente.dto";

import { prismaConnection } from "../../scripts/prismaConection";

const repository = prismaConnection.cliente;

export async function getAll() {
  return await repository.findMany();
}
export async function getById(id: string) {
  return await repository.findUnique({ where: { id } });
}
export async function create(data: ClienteDto) {
  try {
    const result = ClienteDto.parse(data);
    const cliente = await repository.create({ data: result });
  } catch (error) {
    throw error;
  }
}
export async function update(id: string, data: ClienteDto) {
  try {
    const result = ClienteDto.parse(data);
    const cliente = await repository.update({ where: { id }, data: result });
    return cliente;
  } catch (error) {
    throw error;
  }
}
export async function remove(id: string) {
  return await repository.delete({ where: { id } });
}
