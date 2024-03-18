import { FilialUpdate } from "./dtos/filial.dto";
import * as service from "./service";
import { Router } from "express";

export const filiaisRouter = Router({
  mergeParams: true,
});

filiaisRouter.get("/", async (req, res, next) => {
  try {
    const leads = await service.getAll();
    res.json(leads);
  } catch (error) {
    next(error);
  }
});

filiaisRouter.get("/:id", async (req, res, next) => {
  try {
    const params = req.params;
    const { id } = params;

    const lead = await service.getById(id);
    res.json(lead);
  } catch (error) {
    next(error);
  }
});

filiaisRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const data: FilialUpdate = req.body;

  try {
    const lead = await service.update(id, data);
    res.json(lead);
  } catch (error) {
    next(error);
  }
});
