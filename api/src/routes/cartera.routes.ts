import { getCartera } from "../controllers/cartera.controller";
import { Router } from "express";

export const CarteraRouter = Router();

CarteraRouter.get('/cartera', getCartera)