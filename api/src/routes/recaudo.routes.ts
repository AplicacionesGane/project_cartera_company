import { getRecaudo, getReportRecaudo, getReportOracle } from '../controllers/recaudo.controller';
import { Router } from 'express';

export const recaudoRouter = Router();

recaudoRouter.get('/recaudo/:id/:estado', getRecaudo);

recaudoRouter.post('/reportOracle', getReportOracle)

recaudoRouter.post('/reportRecaudo', getReportRecaudo)