// model Usuario {
//     id        String   @id @default(uuid())
//     email     String   @unique
//     perfil    Perfil?
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//   }

// model Perfil {
//     id        String   @id @default(uuid())
//     nomeCompleto      String
//     usuario   Usuario  @relation(fields: [usuarioId], references: [id])
//     usuarioId String   @unique
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//   }

import { z } from "zod";

export const PerfilDto = z.object({
  id: z.string(),
  nome: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const PerfilDtoCreate = PerfilDto.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type PerfilDTO = z.infer<typeof PerfilDto>;
export type PerfilDTOCreate = z.infer<typeof PerfilDtoCreate>;

export const UsuarioDto = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date(),
  perfil: PerfilDto.optional(),
});

export const UsuarioDtoCreate = UsuarioDto.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  perfil: true,
});

export type UsuarioDTO = z.infer<typeof UsuarioDto>;
export type UsuarioDTOCreate = z.infer<typeof UsuarioDtoCreate>;
