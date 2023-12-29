import { z } from "zod";

export const ClienteRepresentanteDTO = z.object({
  id: z.string(),
  clienteId: z.string(),
  nome: z.string(),
  email: z.string(),
  telefone: z.string(),
  cargo: z.string(),
  ativo: z.boolean(),
  departamento: z.string(),
  dataNascimento: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const ClienteRepresentanteDTOCreate = ClienteRepresentanteDTO.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const ClienteRepresentanteDTOUpdate = ClienteRepresentanteDTO.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type ClienteRepresentanteDTO = z.infer<typeof ClienteRepresentanteDTO>;

export type ClienteRepresentanteDTOCreate = z.infer<
  typeof ClienteRepresentanteDTOCreate
>;

export type ClienteRepresentanteDTOUpdate = z.infer<
  typeof ClienteRepresentanteDTOUpdate
>;
