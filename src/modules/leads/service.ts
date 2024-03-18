import { prismaConnection } from "@/scripts/prismaConection";
import { LeadCreate, LeadDtoCreate, LeadUpdate } from "./dtos/lead.dto";
import { OportunidadeCreateDto } from "../oportunidades/dtos/oportunidade.dto";
import { ClienteRepresentanteDTOCreate } from "../clientesRepresentantes/dto/clienteRepresentante.dto";

const repository = prismaConnection.lead;

export async function getAll() {
  return await repository.findMany();
}

export async function getById(id: string) {
  return await repository.findUnique({ where: { id } });
}

export async function create(data: LeadCreate) {
  try {
    const lead = LeadDtoCreate.parse(data);
    return repository.create({ data: lead });
  } catch (error) {
    throw error;
  }
}

export async function update(id: string, data: LeadUpdate) {
  try {
    const lead = LeadDtoCreate.parse(data);
    return await repository.update({ where: { id }, data: lead });
  } catch (error) {
    throw error;
  }
}

export async function remove(id: string) {
  return await repository.delete({ where: { id } });
}

export async function promote(
  id: string,
  representanteData: ClienteRepresentanteDTOCreate,
  oportunidadeData: OportunidadeCreateDto
) {
  return await prismaConnection.$transaction(async (prisma) => {
    //Validando Lead
    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      throw new Error("Lead não encontrado");
    }
    const clienteId = lead.clienteId;

    //Criando Representante
    const representanteValidated = ClienteRepresentanteDTOCreate.parse({
      ...representanteData,
      clienteId,
    });

    const representante = await prisma.clienteRepresentante.create({
      data: representanteValidated,
    });

    //Criando Oportunidade

    const oportunidadeValidated = OportunidadeCreateDto.parse({
      ...oportunidadeData,
      representanteId: representante.id,
      clienteId,
    });

    const oportunidade = await prisma.oportunidade.create({
      data: oportunidadeValidated,
    });

    //Deletando Lead
    await prisma.lead.delete({ where: { id } });

    return {
      representante,
      oportunidade,
    };
  });
}
