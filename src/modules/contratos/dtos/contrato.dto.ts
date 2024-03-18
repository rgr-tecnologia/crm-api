import { AreaExecutora, ContratoCaracteristica } from "@prisma/client";
import { z } from "zod";

export const ContratoDTO = z.object({
  id: z.string().uuid(),
  filialId: z.string().uuid(),
  oportunidadeId: z.string().uuid(),
  representanteId: z.string().uuid(),
  titulo: z.string(),
  caracteristica: z.nativeEnum(ContratoCaracteristica),
  dataInicio: z.coerce.date(),
  dataFimPrevista: z.coerce.date(),
  dataPagamento: z.coerce.date(),
  valor: z.number(),
  renovarAutomaticamente: z.boolean(),
  areaExecutora: z.nativeEnum(AreaExecutora),
  ativo: z.boolean(),
  numeroParcelas: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const ContratoDTOCreate = ContratoDTO.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const ContratoDTOUpdate = ContratoDTO.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type ContratoDTO = z.infer<typeof ContratoDTO>;
export type ContratoDTOCreate = z.infer<typeof ContratoDTOCreate>;
export type ContratoDTOUpdate = z.infer<typeof ContratoDTOUpdate>;
