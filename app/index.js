const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const winston = require('winston')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const morgan = require('morgan')
require('express-async-errors')
require('winston-mongodb')
const app = express()
const config = require('config')

class Application {
  constructor() {
    this.setupSwagger()
    this.setupMongodb()
    this.setupMiddleware()
    this.setupRoutes()
    this.setupError()
    this.setupAddress()
  }

  setupSwagger() {
    const options = {
      definition: {
        openapi: '3.0.0',
        layout: 'BaseLayout',
        info: {
          title: 'Library API',
          version: '1.0.0',
          description: 'A Express Library API',
        },
        servers: [
          {
            url: 'http://localhost:4000',
          },
        ],
      },
      apis: ['./app/swagger/*.js'],
    }

    var cssOptions = {
      customCss: `
      .swagger-ui .opblock-tag { padding: 0px 20px 0px 10px; }
      .swagger-ui .opblock-summary-control:focus { outline: unset; }
      .swagger-ui .opblock-summary-control .arrow { display: none }
      .swagger-ui .opblock .opblock-section-header h4 { font-weight: normal }
      .swagger-ui .model-box-control:focus { outline: unset; }
      .swagger-ui table { margin-top: 5px }
      .swagger-ui table.model tbody tr td:first-of-type { padding: 0 0 3px 4em }
      .swagger-ui .copy-to-clipboard button { padding-left: 30px }`,
    }

    const specs = swaggerJsDoc(options)

    app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs, cssOptions))
  }

  setupMongodb() {
    mongoose
      .connect(config.get('MONGODB_PORT'), {
        useFindAndModify: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Db is Connect')
      })
      .catch(() => {
        console.log('Db is not Connect')
      })
  }

  setupAddress() {
    const port = process.env.port || 4000
    app.listen(port, (err) => {
      if (err) {
        return console.log(err)
      }
      console.log(config.get('MONGODB_PORT'))
      return console.log(`Server Listen in ${process.env.NODE_ENV} on Port ${port}`)
    })
  }

  setupRoutes() {
    app.use('/api', require('./licence/routes/Api'))
    app.use('/api/admin', require('./admin/routes/Api'))
    app.use('/api/public', require('./general/routes/Api'))

    app.use((req, res, next) => {
      res.status(404).json({
        msg: 'Not Found',
        code: 404,
      })
    })
  }

  setupMiddleware() {
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', '*')
      if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*')
        return res.status(200).json()
      }
      next()
    })

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))
    if (process.env.NODE_ENV === 'development') {
      app.use(morgan('dev'))
    }
  }

  setupError() {
    const error = require('./admin/http/middleware/error')

    winston.add(new winston.transports.File({ filename: 'error-log.log' }))
    winston.add(
      new winston.transports.MongoDB({
        db: config.get('MONGODB_PORT'),
        level: 'error',
      })
    )

    process.on('rejectionHandled', (err) => {
      console.log(err)
      winston.error(err)
    })

    process.on('uncaughtException', (err) => {
      console.log(err)
      winston.error(err)
    })

    app.use(error)
  }
}

module.exports = Application
