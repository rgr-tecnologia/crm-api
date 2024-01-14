import { z } from "zod";

export const RepresentanteOportunidadeProspeccaoDto = z.object({
  id: z.string().uuid(),
  nome: z.string(),
  email: z.string(),
  departamento: z.string(),
  cargo: z.string(),
  dataNascimento: z.date(),
  telefone: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const RepresentanteOportunidadeProspeccaoDtoCreate =
  RepresentanteOportunidadeProspeccaoDto.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const RepresentanteOportunidadeProspeccaoDtoUpdate =
  RepresentanteOportunidadeProspeccaoDto.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export type RepresentanteOportunidadeProspeccaoDto = z.infer<
  typeof RepresentanteOportunidadeProspeccaoDto
>;

export type RepresentanteOportunidadeProspeccaoDtoCreate = z.infer<
  typeof RepresentanteOportunidadeProspeccaoDtoCreate
>;

export type RepresentanteOportunidadeProspeccaoDtoUpdate = z.infer<
  typeof RepresentanteOportunidadeProspeccaoDtoUpdate
>;
