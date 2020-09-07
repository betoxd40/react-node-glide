import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import { employeeRouter, departmentRouter, officeRouter } from '@routes/v1'
import { fallbackRoute } from '@middlewares/routes'

const app = express()

// Call midlewares
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Call Routes
app.use('/v1/employees', employeeRouter)
app.use('/v1/departments', departmentRouter)
app.use('/v1/offices', officeRouter)
app.all('*', fallbackRoute)

export { app }
