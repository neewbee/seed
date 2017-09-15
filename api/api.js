
/*eslint-disable */
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import Router from './router'
import morgan from 'morgan'

var path = require("path")

const port = process.env.PORT

const app = express()
app.use('/assets', express.static(path.join(__dirname, '/assets')))
console.log(path.join(__dirname, '/assets'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan(':method :url :status :date[iso] :res[content-length] - :response-time ms'))

Router(app)

app.listen(port, function () {
  console.log('CORS-enabled web server listening on port' , port)
})
