import { Router } from "express";
import * as service from "../../oportunidades/service";
import { OportunidadeCreateDto } from "../../oportunidades/dtos/oportunidade.dto";

type Params = {
  clienteId: string;
};

export const clienteOportunidadesRouter = Router({
  mergeParams: true,
});

clienteOportunidadesRouter.get("/", async (req, res) => {
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

clienteOportunidadesRouter.post("/", async (req, res) => {
  try {
    const params = req.params as Params;
    const data: OportunidadeCreateDto = req.body;

    const { clienteId } = params;
    const oportunidade = await service.create(data);
    res.json(oportunidade);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});
