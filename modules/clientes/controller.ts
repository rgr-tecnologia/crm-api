import { Router } from "express";
import * as service from "./service";
import { representantesRouter } from "./representantes/controller";
import { contratosRouter } from "./contratos/controller";

export const clientesRouter = Router({
    mergeParams: true
});

clientesRouter.use("/:clienteId/representantes", representantesRouter);
clientesRouter.use("/:clienteId/contratos", contratosRouter)

clientesRouter.get("/", async (req, res) => {
    const clientes = await service.getClientes();
    res.json(clientes);
});

clientesRouter.get("/:clienteId", async (req, res) => {
    const cliente = await service.getCliente(req.params.clienteId);
    res.json(cliente);
});

clientesRouter.post("/", async (req, res) => {
    try {
        const cliente = await service.createCliente(req.body);
        res.json(cliente);
    }
    catch (error) {
        if(error instanceof Error) {
            res.status(400).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    }
});

clientesRouter.put("/:clienteId", async (req, res) => {
    try {
        const cliente = await service.updateCliente(req.params.clienteId, req.body);
        res.json(cliente);
    }
    catch (error) {
        if(error instanceof Error) {
            res.status(400).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    }
});

clientesRouter.delete("/:clienteId", async (req, res) => {
    const cliente = await service.deleteCliente(req.params.clienteId);
    res.json(cliente);
});