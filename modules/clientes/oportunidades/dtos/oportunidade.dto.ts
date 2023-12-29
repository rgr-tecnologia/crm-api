import { z } from "zod";

export const Oportunidade = z.object({
  id: z.string(),
  clienteId: z.string(),
  representanteId: z.string(),
  titulo: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const OportunidadeCreate = Oportunidade.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const OportunidadeUpdate = Oportunidade.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Oportunidade = z.infer<typeof Oportunidade>;
export type OportunidadeCreate = z.infer<typeof OportunidadeCreate>;
export type OportunidadeUpdate = z.infer<typeof OportunidadeUpdate>;
