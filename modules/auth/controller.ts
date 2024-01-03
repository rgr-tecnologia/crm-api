import { Router } from "express";
import * as service from "./service";

export const authRouter = Router();

type RequestBody = {
  email: string;
};

authRouter.post("/invite", async (req, res) => {
  try {
    const body: RequestBody = req.body;
    const { email } = body;

    const response = await service.invite(email);

    res.send(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: "Erro interno" });
    }
  }
});
