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
    res.status(500).json({ message: error.message });
  }
});
