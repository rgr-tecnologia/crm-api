import * as service from "./service";
import { Router } from "express";

type Params = {
  id: string;
  leadId: string;
};

export const leadsOportunidadesRouter = Router({
  mergeParams: true,
});

leadsOportunidadesRouter.get("/", async (req, res) => {
  try {
    const params = req.params as Params;
    const { leadId } = params;
    const oportunidades = await service.getAll(leadId);
    res.json(oportunidades);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

leadsOportunidadesRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oportunidade = await service.getById(id);
    res.json(oportunidade);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

leadsOportunidadesRouter.put("/:id", async (req, res) => {
  try {
    const params = req.params as Params;
    const { id, leadId } = params;
    const data = req.body;

    const oportunidade = await service.update(id, leadId, data);
    res.json(oportunidade);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

leadsOportunidadesRouter.post("/", async (req, res) => {
  try {
    const params = req.params as Params;
    const { leadId } = params;
    const data = {
      ...req.body,
      leadId,
    };

    const oportunidade = await service.create(leadId, data);
    res.json(oportunidade);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});
