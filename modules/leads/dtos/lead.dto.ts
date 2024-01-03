import { z } from "zod";
import { mobilePhoneSchema } from "../../../zod/mobilePhoneSchema";

export const LeadDto = z.object({
  id: z.string().uuid(),
  nomeFantasia: z.string(),
  nomeRepresentante: z.string(),
  telefoneRepresentante: mobilePhoneSchema,
  emailRepresentante: z.string().email(),
  observacao: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const LeadDtoCreate = LeadDto.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const LeadDtoUpdate = LeadDto.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type LeadDto = z.infer<typeof LeadDto>;
export type LeadDtoCreate = z.infer<typeof LeadDtoCreate>;
export type LeadDtoUpdate = z.infer<typeof LeadDtoUpdate>;
