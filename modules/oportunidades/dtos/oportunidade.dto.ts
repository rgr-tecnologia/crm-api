import { z } from "zod";

export const OportunidadeDto = z.object({
  clienteId: z.string(),
  representanteId: z.string(),
  titulo: z.string(),
});

export type ContratoDTO = z.infer<typeof OportunidadeDto>;
