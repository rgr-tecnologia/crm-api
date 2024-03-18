import { Router } from "express";
import * as service from "../../filiais/service";

type Params = {
  clienteId: string;
};

export const clienteFiliaisRouter = Router({
  mergeParams: true,
});

clienteFiliaisRouter.get("/", async (req, res) => {
  try {
    const params = req.params as Params;
    const { clienteId } = params;

    const filiais = await service.getAll(clienteId);
    res.json(filiais);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});
