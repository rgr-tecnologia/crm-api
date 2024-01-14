import { prismaConnection } from "../../scripts/prismaConection";
import { LeadDtoCreate } from "./dtos/lead.dto";
import { OportunidadeProspeccaoDtoCreate } from "../prospeccaoOportunidades/dtos/prospeccaoOportunidade.dto";
import { RepresentanteOportunidadeProspeccaoDtoCreate } from "../representantesOportunidadeProspeccao/dtos/representantesOportunidadeProspeccao.dto";
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
  representanteData: RepresentanteOportunidadeProspeccaoDtoCreate,
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

    //Criando Representante
    const representanteValidated =
      RepresentanteOportunidadeProspeccaoDtoCreate.parse(representanteData);

    const representanteProspeccao =
      await prisma.representanteOportunidadeProspeccao.create({
        data: representanteValidated,
      });

    //Criando Oportunidade

    const oportunidadeValidated = OportunidadeProspeccaoDtoCreate.parse(
      oportunidadeProspeccaoData
    );

    const oportunidadeProspeccao = await prisma.oportunidadeProspeccao.create({
      data: {
        ...oportunidadeValidated,
        representanteProspeccaoId: representanteProspeccao.id,
      },
    });

    //Removendo Lead
    await prisma.lead.delete({ where: { id } });

    return {
      representanteProspeccao,
      oportunidadeProspeccao,
    };
  });
}
