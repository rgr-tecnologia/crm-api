import { ContratoCaracteristica } from "@prisma/client";
import { z } from "zod";

export const ContratoDTO = z.object({
  id: z.string().uuid(),
  filialId: z.string().uuid(),
  oportunidadeId: z.string().uuid(),
  titulo: z.string(),
  caracteristica: z.nativeEnum(ContratoCaracteristica),
  dataInicio: z.coerce.date(),
  dataFimPrevista: z.coerce.date(),
  dataPagamento: z.coerce.date(),
  valor: z.number(),
  representanteId: z.string().uuid(),
  ativo: z.boolean(),
  renovarAutomaticamente: z.boolean(),
  numeroParcelas: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const ContratoDTOCreate = ContratoDTO.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const ContratoDTOUpdate = ContratoDTO.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type ContratoDTO = z.infer<typeof ContratoDTO>;
export type ContratoDTOCreate = z.infer<typeof ContratoDTOCreate>;
export type ContratoDTOUpdate = z.infer<typeof ContratoDTOUpdate>;
