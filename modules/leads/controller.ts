import { ClienteDtoCreate } from "../clientes/dtos/cliente.dto";
import { ClienteRepresentanteDTOCreate } from "../clientesRepresentantes/dto/clienteRepresentante.dto";
import { LeadDtoCreate } from "./dtos/lead.dto";
import * as service from "./service";
import { Router } from "express";
import { leadsOportunidadesRouter } from "./oportunidades/controller";

export const leadsRouter = Router({
  mergeParams: true,
});

leadsRouter.use("/:leadId/oportunidades", leadsOportunidadesRouter);

leadsRouter.get("/", async (req, res) => {
  try {
    const leads = await service.getAll();
    res.json(leads);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});

leadsRouter.get("/:id", async (req, res) => {
  try {
    const params = req.params;
    const { id } = params;

    const lead = await service.getById(id);
    res.json(lead);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});

leadsRouter.post("/", async (req, res) => {
  const data: LeadDtoCreate = req.body;
  try {
    const lead = await service.create(data);
    res.json(lead);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});

leadsRouter.post("/:id/promote", async (req, res) => {
  const { id } = req.params;
  const data: {
    cliente: ClienteDtoCreate;
    representante: ClienteRepresentanteDTOCreate;
  } = req.body;

  const { cliente, representante } = data;

  try {
    const serviceResponse = await service.promote(id, cliente, representante);

    res.json(serviceResponse);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
});

leadsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data: LeadDtoCreate = req.body;

  try {
    const lead = await service.update(id, data);
    res.json(lead);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});
