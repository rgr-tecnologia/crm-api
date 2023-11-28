import * as service from "./service";
import { Router } from "express";

export const contratosRouter = Router();

contratosRouter.get("/", async (req, res) => {
    const result = await service.getContratos();
    res.send(result);
});