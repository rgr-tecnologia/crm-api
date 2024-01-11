import { z } from "zod";

export const OportunidadeDto = z.object({
  id: z.string().uuid(),
  clienteId: z.string().uuid(),
  representanteId: z.string().uuid(),
  titulo: z.string(),
  caracteristica: z.enum(["MENSALIDADE", "PROJETO"]),
  areaExecutora: z.enum([
    "INFRAESTRUTURA",
    "DESENVOLVIMENTO",
    "BUSINESS_INTELLIGENCE",
    "ALOCACAO_DE_RECURSOS",
    "HUNTING_DE_RECURSOS",
  ]),
  dataFechamentoPrevista: z.coerce.date(),
  etapa: z.enum(["NEGOCIACAO", "FECHADA", "PERDIDA"]),
  valor: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const OportunidadeCreate = OportunidadeDto.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const OportunidadeUpdate = OportunidadeDto.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type OportunidadeDto = z.infer<typeof OportunidadeDto>;
export type OportunidadeCreate = z.infer<typeof OportunidadeCreate>;
export type OportunidadeUpdate = z.infer<typeof OportunidadeUpdate>;
