import { ClienteDtoCreate } from "../clientes/dtos/cliente.dto";
import * as service from "./service";
import { Router } from "express";

export const leadsRouter = Router({
  mergeParams: true,
});

leadsRouter.get("/", async (req, res) => {
  try {
    const leads = await service.getAll();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

leadsRouter.post("/:id/promote", async (req, res) => {
  const { id } = req.params;
  const data: ClienteDtoCreate = req.body;
  try {
    const cliente = await service.promote(id, data);
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
