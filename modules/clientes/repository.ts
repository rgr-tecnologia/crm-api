import { Prisma } from "@prisma/client";
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
    await clientesRepository.create({
      data,
    });
  } catch (error) {
    throw error;
  }
};

export const update = async (id: string, data: ClienteDto) => {
  try {
    await clientesRepository.update({
      where: {
        id,
      },
      data,
    });
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
