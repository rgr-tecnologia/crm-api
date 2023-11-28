import { Router } from "express";
import * as service from "./service";

export const clientesRepresentantesRouter = Router();

clientesRepresentantesRouter.get("/", async (req, res) => {
    const clientesRepresentantes = await service.getClientesRepresentantes();
    res.json(clientesRepresentantes);
});