import * as express from "express";
import { router } from "@/modules/routes";
import { validateJWT } from "./middlewares/checkJWT";

const PORT = process.env.API_PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", validateJWT, router);

app.use("/", (req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
