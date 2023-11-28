import { z } from "zod";

export const clienteRepresentanteDTO = z.object({
    clienteId: z.string(),
    nome: z.string(),
    email: z.string(),
    telefone: z.string(),
    cargo: z.string(),
    observacoes: z.string(),
    status: z.string(),
    departamento: z.string(),
    dataNascimento: z.string().datetime(),
})

export type clienteRepresentanteDTO = z.infer<typeof clienteRepresentanteDTO>;