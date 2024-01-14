import { z } from "zod";

const ClienteProspeccaoDto = z.object({
  id: z.string().uuid(),
  nomeFantasia: z.string().nonempty(),
  ativo: z.boolean().default(true),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

const ClienteProspeccaoCreateDto = ClienteProspeccaoDto.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const ClienteProspeccaoUpdateDto = ClienteProspeccaoDto.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type ClienteProspeccaoDto = z.infer<typeof ClienteProspeccaoDto>;
export type ClienteProspeccaoCreateDto = z.infer<
  typeof ClienteProspeccaoCreateDto
>;
export type ClienteProspeccaoUpdateDto = z.infer<
  typeof ClienteProspeccaoUpdateDto
>;
