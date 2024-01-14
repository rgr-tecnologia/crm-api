import { LeadDtoCreate } from "./dtos/lead.dto";
import * as service from "./service";
import { Router } from "express";
import { RepresentanteOportunidadeProspeccaoDto } from "../representantesOportunidadeProspeccao/dtos/representantesOportunidadeProspeccao.dto";
import { OportunidadeProspeccaoDtoCreate } from "../prospeccaoOportunidades/dtos/prospeccaoOportunidade.dto";

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
    representanteData: RepresentanteOportunidadeProspeccaoDto;
    oportunidadedData: OportunidadeProspeccaoDtoCreate;
  } = req.body;

  const { representanteData, oportunidadedData } = data;

  try {
    const serviceResponse = await service.promote(
      id,
      representanteData,
      oportunidadedData
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
