import { Router } from "express";
import { createRentals, endRentalsById, getRentals } from "../controllers/alugueis.controller.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", createRentals);
rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals/:id/return", endRentalsById);

export default rentalsRouter;