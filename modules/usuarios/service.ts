import { prismaConnection } from "../../scripts/prismaConection";
import { UsuarioDTOCreate } from "./dtos/Usuario";

const repository = prismaConnection.usuario;

export const findAll = async () => {
  return await repository.findMany();
};

export const findById = async (id: string) => {
  return await repository.findUnique({ where: { id } });
};

export const create = async (data: UsuarioDTOCreate) => {
  return await repository.create({ data });
};
