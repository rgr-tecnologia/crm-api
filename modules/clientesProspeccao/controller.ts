import { Router } from "express";
import * as service from "./service";

import { prospeccaoOportunidadesRouter } from "./oportunidades/controller";
import { representantesRouter } from "./representantes/controller";

export const clientesProspeccaoRouter = Router();

clientesProspeccaoRouter.use(
  "/:prospeccaoId/oportunidades",
  prospeccaoOportunidadesRouter
);

clientesProspeccaoRouter.use(
  "/:prospeccaoId/representantes",
  representantesRouter
);

clientesProspeccaoRouter.get("/", async (req, res) => {
  try {
    const clientesProspeccao = await service.getAll();
    res.json(clientesProspeccao);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});
