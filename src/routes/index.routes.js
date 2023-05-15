import { Router } from "express";
import gameRouter from "./jogos.routes.js";
import customerRouter from "./clientes.routes.js";
import rentalsRouter from "./alugueis.routes.js";

const router = Router();

router.use(gameRouter);
router.use(customerRouter);
router.use(rentalsRouter);

export default router;