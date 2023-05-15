import { Router } from "express";
import gameRouter from "./jogos.routes.js";
import customerRouter from "./clientes.routes.js";

const router = Router();

router.use(gameRouter);
router.use(customerRouter);

export default router;