import { Router } from "express";
import { createGame } from "../controllers/jogos.controller.js";
import { getGames } from "../controllers/jogos.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { gameSchema } from "../schemas/jogos.schemas.js";

const gameRouter = Router();

gameRouter.post("/games", validateSchema(gameSchema), createGame);
gameRouter.get("/games", getGames);

export default gameRouter;