import * as service from "../../contratos/service";
import { Router } from "express";

export const contratosRouter = Router({
    mergeParams: true
});

contratosRouter.get("/", async (req, res) => {
    const {
        clienteId
    } = req.params as { clienteId: string };
    const result = await service.getContratoByClienteId(clienteId);
    res.send(result);
});

contratosRouter.get("/:contratoId", async (req, res) => {
    const result = await service.getContrato(req.params.contratoId);
    res.send(result);
});

contratosRouter.post("/", async (req, res) => {
    const {
        clienteId
    } = req.params as { clienteId: string };

    const data = {
        ...req.body,
        clienteId
    }
    try {
        const result = await service.createContrato(data);
        res.send(result);
    }
    catch (error) {
        if(error instanceof Error) {
            res.status(400).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    }
});

contratosRouter.put("/:contratoId", async (req, res) => {
    try {
        const result = await service.updateContrato(req.params.contratoId, req.body);
        res.send(result);
    }
    catch (error) {
        if(error instanceof Error) {
            res.status(400).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    }
});