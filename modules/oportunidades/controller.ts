import * as service from "./service";
import { Router } from "express";

type Params = {
  clienteId: string;
};

export const oportunidadesRouter = Router({
  mergeParams: true,
});

oportunidadesRouter.get("/", async (req, res) => {
  try {
    const body = req.body as Params;
    const { clienteId } = body;
    const oportunidades = await service.getAll(clienteId);
    res.json(oportunidades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
