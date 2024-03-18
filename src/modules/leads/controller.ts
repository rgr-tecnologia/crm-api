import { ClienteRepresentanteDTOCreate } from "../clientesRepresentantes/dto/clienteRepresentante.dto";
import { OportunidadeCreateDto } from "../oportunidades/dtos/oportunidade.dto";
import { LeadCreate, LeadUpdate } from "./dtos/lead.dto";
import * as service from "./service";
import { Router } from "express";

export const leadsRouter = Router({
  mergeParams: true,
});

leadsRouter.get("/", async (req, res, next) => {
  try {
    const leads = await service.getAll();
    res.json(leads);
  } catch (error) {
    next(error);
  }
});

leadsRouter.get("/:id", async (req, res, next) => {
  try {
    const params = req.params;
    const { id } = params;

    const lead = await service.getById(id);
    res.json(lead);
  } catch (error) {
    next(error);
  }
});

leadsRouter.post("/", async (req, res, next) => {
  const data: LeadCreate = req.body;
  try {
    const lead = await service.create(data);
    res.json(lead);
  } catch (error) {
    next(error);
  }
});
leadsRouter.post("/:id/promote", async (req, res, next) => {
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
    next(error);
  }
});

leadsRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const data: LeadUpdate = req.body;

  try {
    const lead = await service.update(id, data);
    res.json(lead);
  } catch (error) {
    next(error);
  }
});
