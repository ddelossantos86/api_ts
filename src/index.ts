import express, { Application } from 'express';

import cors from 'cors';
import morgan from 'morgan';
require('dotenv').config();
// servidores
import dbArsat from './conexiones/dbMongo';
// rutas
import serverRoute from './routes/server';
import proyectoBusqueda from './routes/proyecto01/proyecto01.routes';



class ServerSPS {
  private app: Application;
  private port: string;
  private apiPath = '/api';

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8001';
    //incio los Middlewares
    this.middlewares();
    //cargar rutas
    this.routes();
  }



  async listen() {
    await dbArsat.dbLocal();
    //Servidor Express
    this.app.listen(this.port, () => {
      console.info(`Servidor funcionando en: \x1b[32m${this.port}\x1b[0m`);
    });
  }

  middlewares() {
    //morgan para ver estados de los endpoint
    this.app.use(morgan('dev'));
    //cors
    this.app.use(cors());
    //express
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json({ limit: '50mb' }));

    this.app.all('*', (req, res, next) => {
      //res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, X-Requested-With,Accept ');
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');

      // Permitir que el método OPTIONS funcione sin autenticación
      if ('OPTIONS' === req.method) {
        res.header('Access-Control-Max-Age', '1728000');
        res.sendStatus(200);
      } else {
        next();
      }
    });
  }
  // lista de rutas

  routes() {
    this.app.use(this.apiPath, serverRoute);
    this.app.use(this.apiPath,proyectoBusqueda);
  }
}

export default ServerSPS;
