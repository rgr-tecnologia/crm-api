import { prismaConnection } from "../../scripts/prismaConection";
import { ClienteDto } from "./dtos/cliente.dto";

const clientesRepository = prismaConnection.cliente;

export const findAll = async () => {
  return await clientesRepository.findMany();
};

export const findById = async (id: string) => {
  return await clientesRepository.findUnique({
    where: {
      id,
    },
  });
};

export const create = async (data: ClienteDto) => {
  try {
    return await clientesRepository.create({
      data,
    });
  } catch (error) {
    throw error;
  }
};

export const update = async (id: string, data: ClienteDto) => {
  try {
    const result = await clientesRepository.update({
      where: {
        id,
      },
      data,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

export const remove = async (id: string) => {
  await clientesRepository.delete({
    where: {
      id,
    },
  });
};
