import * as service from "./service";
import { Router } from "express";

export const oportunidadesRouter = Router({
  mergeParams: true,
});

oportunidadesRouter.get("/", async (req, res) => {
  try {
    const oportunidades = await service.getAll();
    res.json(oportunidades);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    res.status(500).json({ message: "Erro interno" });
  }
});
