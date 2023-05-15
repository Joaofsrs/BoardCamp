import { Router } from "express";
import gameRouter from "./jogos.routes.js";

const router = Router();

router.use(gameRouter);

export default router;