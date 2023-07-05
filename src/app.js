//esto es ecmascript. y esto para un node > 16
import express from 'express';
/**
 * cuando creo mis propios módulos uso ./
 * 
 * {funcion}, sin esto se asigna nombre
 */

import proveedoresRoutes from './routes/proveedores.routes.js';
import indexRoutes from './routes/index.routes.js';

import {PORT} from './config.js'

/**
 * para configurar el servidor
 */
const app = express();

/**
 * esto es para que la aplicación pueda entender jsons y sean interpredados por las rutas de abajo
 */
app.use(express.json());
/**
 * para que los use
 * 
 * /api es el prefijo que van a llevar todas las rutas
 */
app.use(indexRoutes);
app.use('/api',proveedoresRoutes);

/**
 * para cuando pidan rutas que no existen
 */
app.use((req,res,next)=>{
    res.status(404).json({
        message: 'endpoint not found'
    });
});

export default app;