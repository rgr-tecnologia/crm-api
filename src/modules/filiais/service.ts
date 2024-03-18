import { prismaConnection } from "@/scripts/prismaConection";
import {
  FilialCreate,
  FilialCreateDto,
  FilialUpdate,
  FilialUpdateDto,
} from "./dtos/filial.dto";

const repository = prismaConnection.filial;

export async function getAll(clienteId?: string) {
  return await repository.findMany({
    where: { clienteId },
    include: { filialEndereco: true },
  });
}

export async function getById(id: string) {
  return await repository.findUnique({
    where: { id },
    include: { filialEndereco: true },
  });
}

export async function create(data: FilialCreate) {
  try {
    const validated = FilialCreateDto.parse(data);
    return repository.create({
      data: validated,
      include: { filialEndereco: true },
    });
  } catch (error) {
    throw error;
  }
}

export async function update(id: string, data: FilialUpdate) {
  try {
    const validated = FilialUpdateDto.parse(data);
    return await repository.update({
      where: { id },
      data: validated,
      include: { filialEndereco: true },
    });
  } catch (error) {
    throw error;
  }
}

export async function remove(id: string) {
  return await repository.delete({ where: { id } });
}
