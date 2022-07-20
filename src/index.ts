import express from 'express'
import { URLController } from './controller/URLController'
import { MongoConnection } from './database/MongoConnection'

const cors = require('cors')
const api = express()
const bodyParser = require('body-parser')

api.use(express.json())
api.use(bodyParser.urlencoded({ extended: false }))

api.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", 'GET, PUT, POST, DELETE');
    api.use(cors());
    next();
})


const database = new MongoConnection()
database.connect()

const urlController = new URLController()
api.post('/shorten', urlController.shorten)
api.get('/:hash', urlController.redirect)

api.listen(5000, () => console.log('Express listening'))
