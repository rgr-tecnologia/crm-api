import { prismaConnection } from "../../scripts/prismaConection";

import { ClienteDtoCreate } from "../clientes/dtos/cliente.dto";

import { unmaskCnpj } from "../../lib/utils/unmaskCnpj";
import { unmaskPhone } from "../../lib/utils/unmaskPhone";

const repository = prismaConnection.clienteProspeccao;

export async function getAll() {
  return repository.findMany();
}

export async function getById(id: string) {
  return repository.findUnique({ where: { id } });
}

export async function create(data: ClienteProspeccaoCreateDto) {
  try {
    return repository.create({ data });
  } catch (error) {
    throw error;
  }
}

export async function update(id: string, data: ClienteProspeccaoCreateDto) {
  try {
    return repository.update({ where: { id }, data });
  } catch (error) {
    throw error;
  }
}

export async function remove(id: string) {
  try {
    return repository.delete({ where: { id } });
  } catch (error) {
    throw error;
  }
}

export async function promote(
  id: string,
  clienteData: ClienteDtoCreate,
  representanteData: ClienteRepresentanteDTOCreate
) {
  return await prismaConnection.$transaction(async (prisma) => {
    //Validando Lead
    const clienteProspeccao = await prisma.clienteProspeccao.findUnique({
      where: { id },
    });

    if (!clienteProspeccao) {
      throw new Error("Prospeccção não encontrada");
    }

    //Validando Cliente
    const cnpj = unmaskCnpj(clienteData.cnpj);

    const isClienteValid = ClienteDtoCreate.parse({
      ...clienteData,
      cnpj,
    });

    if (!isClienteValid) {
      throw new Error("Dados de cliente inválidos");
    }

    //Salvando Cliente
    const cliente = await prisma.cliente.create({ data: clienteData });

    //Validando Representante

    representanteData.telefone = unmaskPhone(representanteData.telefone);
    representanteData.clienteId = cliente.id;

    const isRepresentanteValid =
      ClienteRepresentanteDTOCreate.parse(representanteData);

    if (!isRepresentanteValid) {
      throw new Error("Dados de representante inválidos");
    }

    //Salvando Representante

    const representante = await prisma.clienteRepresentante.create({
      data: representanteData,
    });

    //Migrando Oportunidades
    const oportunidadesLead = await prisma.leadOportunidade.findMany({
      where: { id },
    });

    const oportunidadesToCreate = oportunidadesLead.map((oportunidade) => {
      return {
        ...oportunidade,
        clienteId: cliente.id,
        representanteId: representante.id,
      };
    });

    const oportunidades = await prisma.oportunidade.createMany({
      data: oportunidadesToCreate,
    });

    //Deletando Lead e LeadOportunidade

    await prisma.leadOportunidade.deleteMany({
      where: { leadId: id },
    });

    await prisma.lead.delete({ where: { id } });

    return { cliente, representante };
  });
}
