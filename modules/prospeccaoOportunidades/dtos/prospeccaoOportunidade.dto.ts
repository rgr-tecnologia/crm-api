import { z } from "zod";
import {
  AreaExecutora,
  OportunidadeCaracteristica,
  OportunidadeEtapa,
} from "@prisma/client";

export const OportunidadeProspeccaoDto = z.object({
  id: z.string().uuid(),
  clienteProspeccaoId: z.string().uuid(),
  representanteProspeccaoId: z.string().uuid(),
  titulo: z.string(),
  caracteristica: z.nativeEnum(OportunidadeCaracteristica),
  areaExecutora: z.nativeEnum(AreaExecutora),
  etapa: z.nativeEnum(OportunidadeEtapa),
  dataFechamentoPrevista: z.coerce.date(),
  valor: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const OportunidadeProspeccaoDtoCreate = OportunidadeProspeccaoDto.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const OportunidadeProspeccaoDtoUpdate = OportunidadeProspeccaoDto.omit({
  id: true,
  clienteProspeccaoId: true,
  createdAt: true,
  updatedAt: true,
});

export type OportunidadeProspeccaoDto = z.infer<
  typeof OportunidadeProspeccaoDto
>;
export type OportunidadeProspeccaoDtoCreate = z.infer<
  typeof OportunidadeProspeccaoDtoCreate
>;
export type OportunidadeProspeccaoDtoUpdate = z.infer<
  typeof OportunidadeProspeccaoDtoUpdate
>;
