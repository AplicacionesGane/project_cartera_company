import { getRecaudo, getReportRecaudo } from '../controllers/recaudo.controller';
import { Router } from 'express';

export const recaudoRouter = Router();

recaudoRouter.get('/recaudo/:id/:estado', getRecaudo);

recaudoRouter.post('/reportRecaudo', getReportRecaudo)