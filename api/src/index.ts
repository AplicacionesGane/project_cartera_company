import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { BasesRouter, CarteraRouter, SellersRouter, recaudoRouter } from './routes'
import { routerResumen } from './routes/resumen.routes'
import { CARTERA_FRONTEND, PORT, VERSION } from './config'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
  origin: CARTERA_FRONTEND,
  credentials: true,
}))

app.use(VERSION, CarteraRouter)
app.use(VERSION, BasesRouter)
app.use(VERSION, SellersRouter)
app.use(VERSION, routerResumen)
app.use(VERSION, recaudoRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http:localhost:${PORT}`)
})

