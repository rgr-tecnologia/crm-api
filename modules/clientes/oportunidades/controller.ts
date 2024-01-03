import { Router } from "express";
import * as service from "../../oportunidades/service";
import {
  OportunidadeCreate,
  OportunidadeUpdate,
} from "../../oportunidades/dtos/oportunidade.dto";

export const oportunidadesRouter = Router({
  mergeParams: true,
});

type Params = {
  id: string;
  clienteId: string;
};

oportunidadesRouter.get("/", async (req, res) => {
  try {
    const params = req.params as Params;
    const { clienteId } = params;

    const oportunidades = await service.getAll(clienteId);
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
  try {
    const params = req.params as Params;
    const data: OportunidadeCreate = req.body;

    const { clienteId } = params;
    const oportunidade = await service.create(clienteId, data);
    res.json(oportunidade);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});

oportunidadesRouter.put("/:id", async (req, res) => {
  try {
    const params = req.params as Params;
    const data: OportunidadeUpdate = req.body;

    const { clienteId } = params;
    const oportunidade = await service.update(clienteId, data);
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
