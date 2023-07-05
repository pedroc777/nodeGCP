/**
 * createPool sirve para mantener un conjunto de producciones para usar en producción
 */
import {createPool} from 'mysql2/promise';
import {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
} from './config.js'


/**
 * con esto se construye la conexión
 */
export const pool = createPool({
    host: DB_HOST,
    user:DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database:DB_DATABASE
});