import { z } from "zod";

export const ContratoDTO = z.object({
  clienteId: z.string(),
  titulo: z.string(),
  caracteristica: z.string(),
  dataInicio: z.string().datetime(),
  dataFimPrevista: z.string().datetime(),
  valor: z.number(),
  representanteId: z.string(),
  status: z.string(),
});

export type ContratoDTO = z.infer<typeof ContratoDTO>;
