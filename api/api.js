
/*eslint-disable */
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import Router from './router'
import morgan from 'morgan'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan(':method :url :status :date[iso] :res[content-length] - :response-time ms'))

Router(app)

app.listen(3001, function () {
  console.log('CORS-enabled web server listening on port 3001')
})
