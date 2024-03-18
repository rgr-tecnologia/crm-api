import { FilialCreate, FilialUpdate } from "./dtos/filial.dto";
import * as service from "./service";
import { Router } from "express";

export const filiaisRouter = Router({
  mergeParams: true,
});

filiaisRouter.get("/", async (req, res, next) => {
  try {
    const filiais = await service.getAll();
    res.json(filiais);
  } catch (error) {
    next(error);
  }
});

filiaisRouter.get("/:id", async (req, res, next) => {
  try {
    const params = req.params;
    const { id } = params;

    const filial = await service.getById(id);
    res.json(filial);
  } catch (error) {
    next(error);
  }
});

filiaisRouter.post("/", async (req, res) => {
  try {
    const data: FilialCreate = req.body;
    const filial = await service.create(data);
    res.json(filial);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});

filiaisRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const data: FilialUpdate = req.body;

  try {
    const filial = await service.update(id, data);
    res.json(filial);
  } catch (error) {
    next(error);
  }
});
