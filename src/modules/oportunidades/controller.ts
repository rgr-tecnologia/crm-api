import { OportunidadeUpdateDto } from "./dtos/oportunidade.dto";
import * as service from "./service";
import { Router } from "express";

type Params = {
  id: string;
};

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

oportunidadesRouter.put("/:id", async (req, res) => {
  try {
    const params = req.params as Params;
    const { id } = params;

    const data: OportunidadeUpdateDto = req.body;
    const { clienteId } = data;

    const oportunidade = await service.update(id, clienteId, data);
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
