import { Router } from "express";
import * as service from "../../filiais/service";
import { FilialCreate } from "@/modules/filiais/dtos/filial.dto";

type Params = {
  clienteId: string;
};

export const clienteFiliaisRouter = Router({
  mergeParams: true,
});

clienteFiliaisRouter.get("/", async (req, res) => {
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

clienteFiliaisRouter.post("/", async (req, res) => {
  try {
    const params = req.params as Params;
    const data: FilialCreate = req.body;

    const { clienteId } = params;
    const oportunidade = await service.create(data);
    res.json(oportunidade);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});
