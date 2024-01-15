import { prismaConnection } from "../../scripts/prismaConection";
import { LeadDtoCreate } from "./dtos/lead.dto";
import { OportunidadeProspeccaoDtoCreate } from "../prospeccaoOportunidades/dtos/prospeccaoOportunidade.dto";
import { ClienteProspeccaoCreateDto } from "../../modules/clientesProspeccao/dtos/clienteProspeccao.dto";
import { unmaskPhone } from "../../lib/utils/unmaskPhone";
import { RepresentanteProspeccaoDtoCreate } from "../representantesProspeccao/dtos/representantesProspeccao.dto";

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
  representanteData: RepresentanteProspeccaoDtoCreate,
  oportunidadeProspeccaoData: OportunidadeProspeccaoDtoCreate
) {
  return await prismaConnection.$transaction(async (prisma) => {
    //Validando Lead
    const lead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      throw new Error("Lead não encontrado");
    }

    //Criando ClienteProspeccao
    const clienteProspeccaoValidated = ClienteProspeccaoCreateDto.parse(lead);

    const clienteProspeccao = await prisma.clienteProspeccao.create({
      data: clienteProspeccaoValidated,
    });

    //Criando Representante
    const representanteValidated =
      RepresentanteProspeccaoDtoCreate.parse(representanteData);

    const representanteProspeccao = await prisma.representanteProspeccao.create(
      {
        data: representanteValidated,
      }
    );

    //Criando Oportunidade

    const oportunidadeValidated = OportunidadeProspeccaoDtoCreate.parse({
      ...oportunidadeProspeccaoData,
      representanteProspeccaoId: representanteProspeccao.id,
      clienteProspeccaoId: clienteProspeccao.id,
    });

    const oportunidadeProspeccao = await prisma.oportunidadeProspeccao.create({
      data: oportunidadeValidated,
    });

    //Deletando Lead
    await prisma.lead.delete({ where: { id } });

    return {
      representanteProspeccao,
      oportunidadeProspeccao,
    };
  });
}
