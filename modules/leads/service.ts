import { ClienteDtoCreate } from "../clientes/dtos/cliente.dto";
import { LeadDtoCreate } from "./dtos/lead.dto";
import { prismaConnection } from "../../scripts/prismaConection";
import { ClienteRepresentanteDTOCreate } from "../clientesRepresentantes/dto/clienteRepresentante.dto";
import { unmaskPhone } from "../../lib/utils/unmaskPhone";
import { unmaskCnpj } from "../../lib/utils/unmaskCnpj";

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
    //Validando Lead
    const lead = await prisma.lead.findUnique({ where: { id } });

    if (!lead) {
      throw new Error("Lead not found");
    }

    //Validando Cliente
    const cnpj = unmaskCnpj(clienteData.cnpj);

    const isClienteValid = ClienteDtoCreate.parse({
      ...clienteData,
      cnpj,
    });

    if (!isClienteValid) {
      throw new Error("Invalid cliente data");
    }

    //Salvando Cliente

    const cliente = await prisma.cliente.create({ data: clienteData });

    //Validando Representante

    representanteData.telefone = unmaskPhone(representanteData.telefone);
    representanteData.clienteId = cliente.id;

    const isRepresentanteValid =
      ClienteRepresentanteDTOCreate.parse(representanteData);

    // {
    //   ativo: true,
    //   cargo: "teste",
    //   clienteId: "b6e2e1fc-ebbf-42b9-b7ba-5b78f30df22b",
    //   dataNascimento: "2023-12-29T19:50:41.937Z",
    //   departamento: "teste",
    //   email: "teste@teste.com.br",
    //   nome: "Teste de telefone lead - representante",
    //   telefone: "11111111111",
    // }

    if (!isRepresentanteValid) {
      throw new Error("Invalid representante data");
    }

    //Salvando Representante

    const representante = await prisma.clienteRepresentante.create({
      data: representanteData,
    });

    //Deletando Lead

    await prisma.lead.delete({ where: { id } });

    return { cliente, representante, lead };
  });
}
