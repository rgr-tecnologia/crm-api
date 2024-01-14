import { Router } from "express";
import * as service from "./service";

const clientesProspeccaoRouter = Router();

clientesProspeccaoRouter.use("/:prospeccaoId", representantesRouter);

clientesProspeccaoRouter.get("/", (request, response) => {
  try {
    return response.json(service.getAll());
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
});
