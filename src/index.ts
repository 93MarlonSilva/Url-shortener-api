import express from 'express'
import cors from 'cors'
import { URLController } from './controller/URLController'
import { MongoConnection } from './database/MongoConnection'
import { config } from './config/Constants'

const api = express()
api.use(express.json())

const cors = require("cors");
api.use(cors({
  origin: config.API_URL,
}))

const database = new MongoConnection()
database.connect()

const urlController = new URLController()
api.post('/shorten', urlController.shorten)
api.get('/:hash', urlController.redirect)

api.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, api.settings.env);
});