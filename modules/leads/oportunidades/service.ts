import { prismaConnection } from "../../../scripts/prismaConection";
import {
  LeadOportunidadeDtoCreate,
  LeadOportunidadeDtoUpdate,
  leadOportunidadeDtoCreate,
  leadOportunidadeDtoUpdate,
} from "./dtos/leadOportunidade.dto";

const repository = prismaConnection.leadOportunidade;

export async function getAll(leadId: string) {
  return repository.findMany({
    where: {
      leadId: leadId,
    },
  });
}

export async function getById(id: string) {
  return repository.findUnique({ where: { id } });
}

export async function create(
  clienteId: string,
  data: LeadOportunidadeDtoCreate
) {
  try {
    const validated = leadOportunidadeDtoCreate.parse({
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
  data: LeadOportunidadeDtoUpdate
) {
  try {
    const validated = leadOportunidadeDtoUpdate.parse({
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
