import { Router } from "express";
import * as clientesRepresentantesService from "../../clientesRepresentantes/service";

export const representantesRouter = Router({
    mergeParams: true
});

representantesRouter.get("/", async (req, res) => {
    const {
        clienteId
    } = req.params as { clienteId: string };
    
    const result = await clientesRepresentantesService.getClienteRepresentanteByClienteId(clienteId);
    res.json(result);
});

representantesRouter.get("/:representanteId", async (req, res) => {
    const result = await clientesRepresentantesService.getClienteRepresentanteByClienteId(req.params.representanteId);
    res.json(result);
});

representantesRouter.post("/", async (req, res) => {
    const {
        clienteId,
    } = req.params as { clienteId: string };

    const data = {
        ...req.body,
        clienteId
    }
    try {
        const result = await clientesRepresentantesService.createClienteRepresentante(data);
        res.json(result);
    }
    catch (error) {
        if(error instanceof Error) {
            res.status(400).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    }
});

representantesRouter.put("/:representanteId", async (req, res) => {
    try {
        const result = await clientesRepresentantesService.updateClienteRepresentante(req.params.representanteId, req.body);
        res.json(result);
    }
    catch (error) {
        if(error instanceof Error) {
            res.status(400).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    }
});

representantesRouter.delete("/:representanteId", async (req, res) => {
    const result = await clientesRepresentantesService.deleteClienteRepresentante(req.params.representanteId);
    res.json(result);
});