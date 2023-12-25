import { ClienteDtoCreate } from "../clientes/dtos/cliente.dto";
import { LeadDtoCreate } from "./dtos/lead.dto";
import { prismaConnection } from "../../scripts/prismaConection";

const repository = prismaConnection.lead;

export async function getAll() {}

export async function getById(id: string) {
  return await repository.findUnique({ where: { id } });
}

export async function create(data: LeadDtoCreate) {
  return await repository.create({ data });
}

export async function remove(id: string) {
  return await repository.delete({ where: { id } });
}

export async function promote(id: string, data: ClienteDtoCreate) {
  const [lead, cliente] = await prismaConnection.$transaction([
    prismaConnection.lead.delete({ where: { id } }),
    prismaConnection.cliente.create({ data }),
  ]);

  return { lead, cliente };
}
