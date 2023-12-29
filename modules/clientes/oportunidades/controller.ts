import { Router } from "express";
import * as service from "./service";
import {
  OportunidadeCreate,
  OportunidadeUpdate,
} from "./dtos/oportunidade.dto";

export const oportunidadesRouter = Router({
  mergeParams: true,
});

oportunidadesRouter.get("/", async (req, res) => {
  try {
    const oportunidades = await service.getAll();
    res.json(oportunidades);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});

oportunidadesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oportunidade = await service.getById(id);
    res.json(oportunidade);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});

oportunidadesRouter.post("/", async (req, res) => {
  const data: OportunidadeCreate = req.body;
  try {
    const oportunidade = await service.create(data);
    res.json(oportunidade);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});

oportunidadesRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data: OportunidadeUpdate = req.body;

  try {
    const oportunidade = await service.update(id, data);
    res.json(oportunidade);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});

oportunidadesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const oportunidade = await service.remove(id);
    res.json(oportunidade);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});
