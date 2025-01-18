import { getCartera, getReportMngr } from '../controllers/cartera.controller';
import { Router } from 'express';

export const CarteraRouter = Router();

CarteraRouter.get('/cartera', getCartera)

CarteraRouter.post('/carteraMngr', getReportMngr)