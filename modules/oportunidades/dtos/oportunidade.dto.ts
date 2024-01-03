import { z } from "zod";

// model Oportunidade {
//   id                     String                     @id @default(uuid())
//   clienteId              String
//   cliente                Cliente                    @relation(fields: [clienteId], references: [id])
//   representanteId        String
//   representante          ClienteRepresentante       @relation(fields: [representanteId], references: [id])
//   //TBD - departamento
//   propostas              Proposta[]
//   titulo                 String
//   //TBD - gerenteComercial
//   caracteristica         OportunidadeCaracteristica
//   //TBD - periodoContratual
//   //TBD - valorPrevisto
//   areaExecutora          AreaExecutora
//   dataFechamentoPrevista DateTime
//   status                 OportunidadeStatus         @default(NEGOCIACAO)
//   createdAt              DateTime                   @default(now())
//   updatedAt              DateTime                   @default(now()) @updatedAt
// }

// enum OportunidadeStatus {
//   NEGOCIACAO
//   FECHADA
//   PERDIDA
// }

// enum OportunidadeCaracteristica {
//   MENSALIDADE
//   PROJETO
// }

// enum AreaExecutora {
//   INFRAESTRUTURA
//   DESENVOLVIMENTO
//   BUSINESS_INTELLIGENCE
//   ALOCACAO_DE_RECURSOS
//   HUNTING_DE_RECURSOS
// }

export const OportunidadeDto = z.object({
  id: z.string().uuid(),
  clienteId: z.string().uuid(),
  representanteId: z.string().uuid(),
  propostas: z.array(z.string().uuid()),
  titulo: z.string(),
  caracteristica: z.enum(["MENSALIDADE", "PROJETO"]),
  areaExecutora: z.enum([
    "INFRAESTRUTURA",
    "DESENVOLVIMENTO",
    "BUSINESS_INTELLIGENCE",
    "ALOCACAO_DE_RECURSOS",
    "HUNTING_DE_RECURSOS",
  ]),
  dataFechamentoPrevista: z.string().datetime(),
  status: z.enum(["NEGOCIACAO", "FECHADA", "PERDIDA"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ContratoDTO = z.infer<typeof OportunidadeDto>;
