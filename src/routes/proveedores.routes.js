import {Router} from 'express';

/**
 * {para exportar funciones individualmente}
 * 
 * .. para subir un nivel
 */
import {getProveedores, createProveedor,updateProvedor,deleteProveedor,getProveedor,patchProvedor} from '../controllers/proveedores.controller.js';


const router = Router();

/**
 * aquí llamamos cada una de las funciones con las rutas
 */
router.get('/proveedores',getProveedores);

/**
 * esta es para trabajar con parámetros
 * :id es el parámetro
 */
router.get('/proveedores/:id',getProveedor);
router.post('/proveedores',createProveedor);

/**
 * actualiza toda la entidad
 */
router.put('/proveedores/:id', updateProvedor);

/**
 * patch actualiza parcialmente
 */
router.patch('/proveedores/:id', patchProvedor);
router.delete('/proveedores/:id', deleteProveedor);

export default router;