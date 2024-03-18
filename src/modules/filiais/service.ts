import { prismaConnection } from "@/scripts/prismaConection";
import {
  FilialCreate,
  FilialCreateDto,
  FilialUpdate,
  FilialUpdateDto,
} from "./dtos/filial.dto";
import { FilialEnderecoCreateDto } from "./dtos/filialEndereco.dto";

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
  return prismaConnection.$transaction(async (prisma) => {
    try {
      const filialEnderecoValidated = FilialEnderecoCreateDto.parse(
        data.filialEndereco
      );
      const filialEnderecoCreated = await prisma.filialEndereco.create({
        data: filialEnderecoValidated,
      });

      const { filialEndereco, ...filial } = FilialCreateDto.parse(data);
      const filialCreated = await prisma.filial.create({
        data: {
          ...filial,
          filialEnderecoId: filialEnderecoCreated.id,
        },
        include: { filialEndereco: true },
      });

      return filialCreated;
    } catch (error) {
      throw error;
    }
  });
}

export async function update(id: string, data: FilialUpdate) {
  return prismaConnection.$transaction(async (prisma) => {
    try {
      const result = await prisma.filial.findUnique({
        where: { id },
      });

      if (!result) {
        throw new Error("Filial não encontrada");
      }

      const filialEnderecoId = result.filialEnderecoId;

      const filialEnderecoValidated = FilialEnderecoCreateDto.parse(
        data.filialEndereco
      );

      const filialEnderecoUpdated = await prisma.filialEndereco.update({
        where: { id: filialEnderecoId },
        data: filialEnderecoValidated,
      });

      if (!filialEnderecoUpdated)
        throw new Error("Erro ao atualizar endereço da filial");

      const { filialEndereco, ...filial } = FilialCreateDto.parse(data);
      const filialUpdated = await prisma.filial.update({
        where: { id },
        data: {
          ...filial,
          filialEnderecoId,
        },
        include: { filialEndereco: true },
      });

      if (!filialUpdated) throw new Error("Erro ao atualizar filial");

      return filialUpdated;
    } catch (error) {
      throw error;
    }
  });
}

export async function remove(id: string) {
  return await repository.delete({ where: { id } });
}
