import { prismaConnection } from "../../scripts/prismaConection";
import { clienteRepresentanteDTO } from "./dto/clienteRepresentante.dto";

const repository = prismaConnection.clienteRepresentante;

export async function getClientesRepresentantes() {
  return await repository.findMany();
}

export async function getClienteRepresentanteByClienteId(clienteId: string) {
  return await repository.findMany({
    where: {
      clienteId,
    },
  });
}

export async function getClienteRepresentanteByIdAndClientId(
  clienteId: string,
  representanteId: string
) {
  return await repository.findFirst({
    where: {
      id: representanteId,
      clienteId,
    },
  });
}

export async function getClienteRepresentante(id: string) {
  return await repository.findUnique({
    where: {
      id,
    },
  });
}

export async function createClienteRepresentante(
  data: clienteRepresentanteDTO
) {
  const result = clienteRepresentanteDTO.parse(data);
  return await repository.create({
    data: result,
  });
}

export async function updateClienteRepresentante(
  id: string,
  data: clienteRepresentanteDTO
) {
  const result = clienteRepresentanteDTO.parse(data);
  return await repository.update({
    where: {
      id,
    },
    data: result,
  });
}

export async function deleteClienteRepresentante(id: string) {
  return await repository.delete({
    where: {
      id,
    },
  });
}
