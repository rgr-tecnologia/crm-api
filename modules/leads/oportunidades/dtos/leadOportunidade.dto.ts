import { z } from "zod";
import { OportunidadeCaracteristica } from "../../../../lib/enums/OportunidadeCaracteristica";
import { AreaExecutora } from "../../../../lib/enums/AreaExecutora";
import { OportunidadeEtapa } from "../../../../lib/enums/OportunidadeEtapa";

export const leadOportunidadeDto = z.object({
  id: z.string(),
  leadId: z.string(),
  titulo: z.string(),
  caracteristica: z.nativeEnum(OportunidadeCaracteristica),
  areaExecutora: z.nativeEnum(AreaExecutora),
  dataFechamentoPrevista: z.date(),
  etapa: z.nativeEnum(OportunidadeEtapa),
  valor: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  contrato: z.array(z.string()),
  clienteId: z.string(),
  clienteRepresentanteId: z.string(),
});

export const leadOportunidadeDtoCreate = leadOportunidadeDto.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const leadOportunidadeDtoUpdate = leadOportunidadeDto.omit({
  id: true,
  leadId: true,
  createdAt: true,
  updatedAt: true,
});

export type LeadOportunidadeDto = z.infer<typeof leadOportunidadeDto>;
export type LeadOportunidadeDtoCreate = z.infer<
  typeof leadOportunidadeDtoCreate
>;
export type LeadOportunidadeDtoUpdate = z.infer<
  typeof leadOportunidadeDtoUpdate
>;
