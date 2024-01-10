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
  dataFechamentoPrevista: z.coerce.date(),
  etapa: z.nativeEnum(OportunidadeEtapa),
  valor: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
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
