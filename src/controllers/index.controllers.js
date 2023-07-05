import {pool} from '../db.js';

export const ping = async (req, res)=> {
    //esto es para obtener un [arreglo]
    //const [result] = await pool.query('SELECT * FROM proveedor');
    //res.json(result[0]);
    res.send('pong');
}