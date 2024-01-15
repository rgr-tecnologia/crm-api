import { Router } from "express";
import { clientesRouter } from "./clientes/controller";
import { contratosRouter } from "./contratos/controller";
import { clientesRepresentantesRouter } from "./clientesRepresentantes/controller";
import { leadsRouter } from "./leads/controller";
import { clientesProspeccaoRouter } from "./clientesProspeccao/controller";
import { authRouter } from "./auth/controller";

export const router = Router();

router.use("/clientes", clientesRouter);
router.use("/contratos", contratosRouter);
router.use("/representantes", clientesRepresentantesRouter);
router.use("/leads", leadsRouter);
router.use("/prospeccoes", clientesProspeccaoRouter);
router.use("/auth", authRouter);
