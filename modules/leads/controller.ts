import { ClienteDtoCreate } from "../clientes/dtos/cliente.dto";
import { ClienteRepresentanteDTOCreate } from "../clientesRepresentantes/dto/clienteRepresentante.dto";
import { LeadDtoCreate } from "./dtos/lead.dto";
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
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});

leadsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
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

  const { cliente: clienteData, representante: representanteData } = data;

  try {
    const { cliente, representante } = await service.promote(
      id,
      clienteData,
      representanteData
    );

    res.json({
      cliente,
      representante,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});
