import { Router } from "express";
import { createRentals, deleteRentalsById, endRentalsById, getRentals } from "../controllers/alugueis.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { rentalSchema } from "../schemas/alugueis.schemas.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateSchema(rentalSchema), createRentals);
rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals/:id/return", endRentalsById);
rentalsRouter.delete("/rentals/:id", deleteRentalsById);

export default rentalsRouter;