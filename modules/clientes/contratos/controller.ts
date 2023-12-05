import * as service from "../../contratos/service";
import { Router } from "express";

export const contratosRouter = Router({
  mergeParams: true,
});

type params = {
  clienteId: string;
  contratoId: string;
};

contratosRouter.get("/", async (req, res) => {
  const { clienteId } = req.params as params;
  const result = await service.getContratoByClienteId(clienteId);
  res.send(result);
});

contratosRouter.get("/:contratoId", async (req, res) => {
  const result = await service.getContrato(req.params.contratoId);
  res.send(result);
});

contratosRouter.post("/", async (req, res) => {
  const { clienteId } = req.params as params;

  const data = {
    ...req.body,
    clienteId,
  };
  try {
    const result = await service.createContrato(data);
    res.send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

contratosRouter.put("/:contratoId", async (req, res) => {
  const { contratoId } = req.params as params;
  const data = req.body;
  try {
    const result = await service.updateContrato(contratoId, data);
    res.send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
});
