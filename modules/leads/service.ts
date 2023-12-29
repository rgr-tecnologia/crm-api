import { ClienteDtoCreate } from "../clientes/dtos/cliente.dto";
import { LeadDtoCreate } from "./dtos/lead.dto";
import { prismaConnection } from "../../scripts/prismaConection";
import { ClienteRepresentanteDTOCreate } from "../clientesRepresentantes/dto/clienteRepresentante.dto";
import { unmaskPhone } from "../../lib/utils/unmaskPhone";

const repository = prismaConnection.lead;

export async function getAll() {
  return await repository.findMany();
}

export async function getById(id: string) {
  return await repository.findUnique({ where: { id } });
}

export async function create(data: LeadDtoCreate) {
  try {
    const phone = unmaskPhone(data.telefoneRepresentante);
    const lead = LeadDtoCreate.parse({
      ...data,
      telefoneRepresentante: phone,
    });
    return repository.create({ data: lead });
  } catch (error) {
    console.log(error);
  }
}

export async function remove(id: string) {
  return await repository.delete({ where: { id } });
}

export async function promote(
  id: string,
  clienteData: ClienteDtoCreate,
  representanteData: ClienteRepresentanteDTOCreate
) {
  return await prismaConnection.$transaction(async (prisma) => {
    const lead = await prisma.lead.findUnique({ where: { id } });
    const clienteValidated = ClienteDtoCreate.parse(clienteData);
    const representanteValidated =
      ClienteRepresentanteDTOCreate.parse(representanteData);

    if (!lead) {
      throw new Error("Lead not found");
    }

    if (!clienteValidated) {
      throw new Error("Invalid cliente data");
    }

    if (!representanteValidated) {
      throw new Error("Invalid representante data");
    }

    const cliente = await prisma.cliente.create({ data: clienteData });
    const representante = await prisma.clienteRepresentante.create({
      data: {
        ...representanteData,
        clienteId: cliente.id,
      },
    });

    await prisma.lead.delete({ where: { id } });

    return { cliente, representante, lead };
  });
}
