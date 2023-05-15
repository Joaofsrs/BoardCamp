import { Router } from "express";
import { createCustomer, getCustomerById, getCustomers, updateCustomerById } from "../controllers/clientes.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middlewares.js";
import { customerSchema } from "../schemas/clientes.schemas.js";

const customerRouter = Router();

customerRouter.post("/customers", validateSchema(customerSchema), createCustomer);
customerRouter.get("/customers", getCustomers);
customerRouter.get("/customers/:id", getCustomerById);
customerRouter.put("/customers/:id", validateSchema(customerSchema), updateCustomerById);

export default customerRouter;