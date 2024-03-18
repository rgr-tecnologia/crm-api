import { Router } from "express";
import * as service from "./service";
import { representantesRouter } from "./representantes/controller";
import { contratosRouter } from "./contratos/controller";
import { clienteOportunidadesRouter } from "./oportunidades/controller";

export const clientesRouter = Router({
  mergeParams: true,
});

clientesRouter.use("/:clienteId/representantes", representantesRouter);
clientesRouter.use("/:clienteId/contratos", contratosRouter);
clientesRouter.use("/:clienteId/oportunidades", clienteOportunidadesRouter);

clientesRouter.get("/", async (req, res) => {
  const clientes = await service.getAll();
  res.json(clientes);
});

clientesRouter.get("/:clienteId", async (req, res) => {
  const cliente = await service.getById(req.params.clienteId);
  res.json(cliente);
});

clientesRouter.post("/", async (req, res) => {
  try {
    const cliente = await service.create(req.body);
    res.json(cliente);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

clientesRouter.put("/:clienteId", async (req, res) => {
  try {
    const cliente = await service.update(req.params.clienteId, req.body);
    res.json(cliente);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

clientesRouter.delete("/:clienteId", async (req, res) => {
  const cliente = await service.remove(req.params.clienteId);
  res.json(cliente);
});
