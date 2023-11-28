import { z } from "zod";

export const ClienteDto = z.object({
    nomeFantasia: z.string()
})

export type ClienteDto = z.infer<typeof ClienteDto>;