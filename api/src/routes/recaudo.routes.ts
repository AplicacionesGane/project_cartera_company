import { Router } from "express";
import { getRecaudo } from "../controllers/recaudo.controller";

export const recaudoRouter = Router();

recaudoRouter.get('/recaudo/:id/:estado', getRecaudo);