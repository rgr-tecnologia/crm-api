import { ClienteRepresentanteDTOCreate } from "../clientesRepresentantes/dto/clienteRepresentante.dto";
import { OportunidadeCreateDto } from "../oportunidades/dtos/oportunidade.dto";
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
    } else {
      res.status(500).json({ message: "Internal server error" });
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
  try {
    const { id } = req.params;
    const data: {
      representante: ClienteRepresentanteDTOCreate;
      oportunidade: OportunidadeCreateDto;
    } = req.body;

    const { representante, oportunidade } = data;

    const serviceResponse = await service.promote(
      id,
      representante,
      oportunidade
    );

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
