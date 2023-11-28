import { Router } from "express";
import { clientesRouter } from "./clientes/controller";
import { contratosRouter } from "./contratos/controller";
import { clientesRepresentantesRouter } from "./clientesRepresentantes/controller";


export const router = Router();

router.use('/clientes', clientesRouter)
router.use('/contratos', contratosRouter)
router.use('/representantes', clientesRepresentantesRouter)

