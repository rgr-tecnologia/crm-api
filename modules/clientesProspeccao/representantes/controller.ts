import { Router } from "express";
import * as representantesService from "../../representantesProspeccao/service";

export const representantesRouter = Router({
  mergeParams: true,
});

type params = {
  prospeccaoId: string;
  representanteId: string;
};

representantesRouter.get("/", async (req, res) => {
  const { prospeccaoId } = req.params as params;

  const result = await representantesService.getAll({
    clienteProspeccaoId: prospeccaoId,
  });
  res.json(result);
});

representantesRouter.get("/:representanteId", async (req, res) => {
  const { representanteId } = req.params as params;

  const result = await representantesService.getAll({
    id: representanteId,
  });
  res.json(result);
});

representantesRouter.post("/", async (req, res) => {
  const { clienteId } = req.params as { clienteId: string };

  const data = {
    ...req.body,
    clienteId,
  };
  try {
    const result = await representantesService.create(data);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

representantesRouter.put("/:representanteId", async (req, res) => {
  try {
    const result = await representantesService.update(
      req.params.representanteId,
      req.body
    );
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

representantesRouter.delete("/:representanteId", async (req, res) => {
  const result = await representantesService.remove(req.params.representanteId);
  res.json(result);
});
