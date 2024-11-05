import { getCarteraResumen, getRecaudoResumen } from '../controllers/resumen.controller'
import { Router } from 'express'

export const routerResumen = Router()

routerResumen.get('/resumenCartera', getCarteraResumen)

routerResumen.get('/resumenRecaudo', getRecaudoResumen)