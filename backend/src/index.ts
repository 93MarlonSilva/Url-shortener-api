import express, { application } from 'express'
import { URLController } from './controller/URLController'
import { MongoConnection } from './database/MongoConnection'
import cors from "cors"

const api = express()

api.use(cors())
api.use(express.json())

const database = new MongoConnection() // Starta conexão com banco de dados
database.connect()

const urlController = new URLController() // Starta o controller
api.post('/shorten', urlController.shorten) // Rota post com uso do cors para liberar acesso
api.get('/:hash', urlController.redirect) // Rota get com uso do cors para liberar acesso

api.listen(5000, () => console.log('Express listening')) // Listen da porta

//api.listen(process.env.PORT || 3000, function(){
//    console.log("Express server listening on port %d in %s mode", this.address().port, api.settings.env);
//  });
