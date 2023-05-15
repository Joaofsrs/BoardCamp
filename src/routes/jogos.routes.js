import { Router } from "express";
import { createGame } from "../controllers/jogos.controller.js";
import { getGames } from "../controllers/jogos.controller.js";

const gameRouter = Router();

gameRouter.post("/games", createGame);
gameRouter.get("/games", getGames);

export default gameRouter;