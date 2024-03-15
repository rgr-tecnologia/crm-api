import {
  AreaExecutora,
  OportunidadeCaracteristica,
  OportunidadeEtapa,
} from "@prisma/client";
import { z } from "zod";

export const OportunidadeDto = z.object({
  id: z.string().uuid(),
  clienteId: z.string().uuid(),
  representanteId: z.string().uuid(),
  titulo: z.string(),
  caracteristica: z.nativeEnum(OportunidadeCaracteristica),
  areaExecutora: z.nativeEnum(AreaExecutora),
  etapa: z.nativeEnum(OportunidadeEtapa),
  dataFechamentoPrevista: z.coerce.date(),
  valor: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const OportunidadeCreateDto = OportunidadeDto.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const OportunidadeUpdateDto = OportunidadeDto.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type OportunidadeDto = z.infer<typeof OportunidadeDto>;
export type OportunidadeCreateDto = z.infer<typeof OportunidadeCreateDto>;
export type OportunidadeUpdateDto = z.infer<typeof OportunidadeUpdateDto>;
