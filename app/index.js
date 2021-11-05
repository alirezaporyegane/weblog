const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const winston = require('winston');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require('express-async-errors');
require('winston-mongodb');
const app = express();

class Application {
  constructor () {
    this.setupSwagger()
    this.setupMongodb()
    this.setupMiddleware()
    this.setupRoutes()
    this.setupError()
    this.setupAddress()
  }

  setupSwagger () {
    const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Library API",
          version: "1.0.0",
          description: "A Express Library API"
        },
        servers: [
          {
            url: "http://localhost:4000",
          }
        ]
      },
      apis: ["./admin/routes/*.js"]
    }
    
    const specs = swaggerJsDoc(options)
    
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))
  }

  setupMongodb () {
    mongoose.connect('mongodb://127.0.0.1:27017/rest-api', { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Db is Connect")
    })
    .catch(() => {
      console.log("Db is not Connect");
    })
  }

  setupAddress () {
    const port = process.env.port || 4000
    app.listen(port, (err) => {
      if (err) {
        return console.log(err)
      }
      return console.log(`Server Listen on Port ${port}`)
    });
  }

  setupRoutes () {
    const adminApi = require('./admin/routes/api');

    app.use('/api/admin', adminApi)

    app.use((req, res, next) => {
      res.status(404).json({
        msg: 'Not Found'
      })
    });
  }

  setupMiddleware () {
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', '*')
      if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*')
        return res.status(200).json()
      }
      next()
    });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json())
    app.use(express.static('public'))

  }

  setupError () {
    const error = require('./admin/http/middleware/error')

    winston.add(new winston.transports.File({filename: 'error-log.log'}))
    winston.add(new winston.transports.MongoDB({
      db: 'mongodb://127.0.0.1:27017/rest-api',
      level: 'error'
    }))

    process.on('rejectionHandled',(err) => {
      console.log(err)
      winston.error(err)
    })
    
    process.on("uncaughtException", (err) => {
      console.log(err)
      winston.error(err)
    })

    app.use(error)
  }
}



module.exports = Application
