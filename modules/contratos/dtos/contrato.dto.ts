import { z } from "zod";

export const ContratoDTO = z.object({
  clienteId: z.string().uuid(),
  titulo: z.string(),
  caracteristica: z.enum(["MENSALIDADE", "PROJETO"]),
  dataInicio: z.date(),
  dataFimPrevista: z.date(),
  valor: z.number(),
  representanteId: z.string().uuid(),
  ativo: z.boolean(),
  RenovarAutomaticamente: z.boolean(),
  DataPagamento: z.date(),
  NumeroParcelas: z.number(),
});

export type ContratoDTO = z.infer<typeof ContratoDTO>;
