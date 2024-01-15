import { z } from "zod";

export const RepresentanteProspeccaoDto = z.object({
  id: z.string().uuid(),
  clienteProspeccaoId: z.string().uuid(),
  nome: z.string(),
  email: z.string(),
  departamento: z.string(),
  cargo: z.string(),
  ativo: z.boolean(),
  dataNascimento: z.coerce.date(),
  telefone: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const RepresentanteProspeccaoDtoCreate = RepresentanteProspeccaoDto.omit(
  {
    id: true,
    createdAt: true,
    updatedAt: true,
  }
);

export const RepresentanteProspeccaoDtoUpdate = RepresentanteProspeccaoDto.omit(
  {
    id: true,
    createdAt: true,
    updatedAt: true,
  }
);

export type RepresentanteProspeccaoDto = z.infer<
  typeof RepresentanteProspeccaoDto
>;

export type RepresentanteProspeccaoDtoCreate = z.infer<
  typeof RepresentanteProspeccaoDtoCreate
>;

export type RepresentanteProspeccaoDtoUpdate = z.infer<
  typeof RepresentanteProspeccaoDtoUpdate
>;
