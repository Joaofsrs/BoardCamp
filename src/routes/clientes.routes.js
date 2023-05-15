import { Router } from "express";
import { createCustomer, getCustomerById, getCustomers, updateCustomerById } from "../controllers/clientes.controller.js";

const customerRouter = Router();

customerRouter.post("/customers", createCustomer);
customerRouter.get("/customers", getCustomers);
customerRouter.get("/customers/:id", getCustomerById);
customerRouter.put("/customers/:id", updateCustomerById);

export default customerRouter;