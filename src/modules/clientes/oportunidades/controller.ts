import { Router } from "express";
import * as service from "../../oportunidades/service";
import { OportunidadeCreateDto } from "../../oportunidades/dtos/oportunidade.dto";

type Params = {
  clienteId: string;
};

export const oportunidadesRouter = Router({
  mergeParams: true,
});

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

oportunidadesRouter.post("/", async (req, res) => {
  try {
    const params = req.params as Params;
    const data: OportunidadeCreateDto = req.body;

    const { clienteId } = params;
    const oportunidade = await service.create(clienteId, data);
    res.json(oportunidade);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});
