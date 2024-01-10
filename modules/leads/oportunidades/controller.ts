import * as service from "./service";
import { Router } from "express";

type Params = {
  leadId: string;
};

export const leadsOportunidadesRouter = Router({
  mergeParams: true,
});

leadsOportunidadesRouter.get("/", async (req, res) => {
  try {
    const body = req.body as Params;
    const { leadId } = body;
    const oportunidades = await service.getAll(leadId);
    res.json(oportunidades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
