import { Router } from "express";
import * as service from "../../prospeccaoOportunidades/service";

type Params = {
  prospeccaoId: string;
  oportunidadeId: string;
};

export const prospeccaoOportunidadesRouter = Router({
  mergeParams: true,
});

prospeccaoOportunidadesRouter.get("/", async (req, res) => {
  const params = req.params as Params;

  const { prospeccaoId } = params;

  const oportunidades = await service.getAll({
    clienteProspeccaoId: prospeccaoId,
  });
  res.json(oportunidades);
});

prospeccaoOportunidadesRouter.get("/:oportunidadeId", async (req, res) => {
  const params = req.params as Params;
  const oportunidade = await service.getById(params.oportunidadeId);
  res.json(oportunidade);
});

prospeccaoOportunidadesRouter.post("/", async (req, res) => {
  try {
    const params = req.params as Params;
    const oportunidade = await service.create({
      ...req.body,
      clienteProspeccaoId: params.prospeccaoId,
    });
    res.json(oportunidade);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

prospeccaoOportunidadesRouter.put("/:oportunidadeId", async (req, res) => {
  try {
    const params = req.params as Params;
    const oportunidade = await service.update(params.oportunidadeId, req.body);
    res.json(oportunidade);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

prospeccaoOportunidadesRouter.delete("/:oportunidadeId", async (req, res) => {
  const oportunidade = await service.remove(req.params.oportunidadeId);
  res.json(oportunidade);
});
