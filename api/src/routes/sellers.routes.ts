import { GetSellers } from '../controllers/sellers.controller'
import { Router } from 'express'

export const SellersRouter = Router()

SellersRouter.get('/GetSellers', GetSellers)
