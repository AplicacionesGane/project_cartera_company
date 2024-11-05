import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { BasesRouter, CarteraRouter, SellersRouter, recaudoRouter } from './routes'
import { routerResumen } from './routes/resumen.routes'
import { CARTERA_FRONTEND, PORT, v1 } from './config'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
  origin: CARTERA_FRONTEND,
  credentials: true,
}))

app.use(v1, CarteraRouter)
app.use(v1, BasesRouter)
app.use(v1, SellersRouter)
app.use(v1, routerResumen)
app.use(v1, recaudoRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http:localhost:${PORT}`)
})

