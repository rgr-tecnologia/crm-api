import { ClienteDtoCreate } from "../clientes/dtos/cliente.dto";
import { LeadDtoCreate } from "./dtos/lead.dto";
import { prismaConnection } from "../../scripts/prismaConection";
import { ClienteRepresentanteDTOCreate } from "../clientesRepresentantes/dto/clienteRepresentante.dto";
import { unmaskPhone } from "../../lib/utils/unmaskPhone";
import { unmaskCnpj } from "../../lib/utils/unmaskCnpj";
import { OportunidadeCreate } from "../oportunidades/dtos/oportunidade.dto";

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

export async function update(id: string, data: LeadDtoCreate) {
  try {
    const phone = unmaskPhone(data.telefoneRepresentante);
    const lead = LeadDtoCreate.parse({
      ...data,
      telefoneRepresentante: phone,
    });
    return await repository.update({ where: { id }, data: lead });
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

    if (!isRepresentanteValid) {
      throw new Error("Invalid representante data");
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
