import { pool } from "../db.js";

/**
 * función que recupera proveedores
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getProveedores = async (req, res)=> {
    /**
     * el manejo de errores consiste en poner trycatch en todos los métodos
     * también se puede usar el express promise router para manejar los errores
     */
    try {
        const [rows] = await pool.query('SELECT * FROM cliente');
        res.json(rows);
    } catch (error) {
        /**
         * error de servidor
         */
        return res.status(500).json({
            message: 'algo salió mal'
        });
    }
};

/**
 * función que recupera proveedores
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getProveedor = async (req, res)=> {
    /**
     * para extraer el parámetro de la url
     */
    console.log(req.params.id);
    //res.send("sí lo estoy obteniendo");
    const [rows] = await pool.query('SELECT * FROM Cliente WHERE clienteId = ?',[req.params.id]);
    console.log(rows);

    /**
     * esto es para enviar como respuesta el resultado de la consulta
     */
    if(rows.length <= 0) return res.status(404).json({
        message: 'No se encontró el proveedor'
    });
    res.json(rows[0]);
};

/**
 * funcion que crea proveedores
 * @param {*} req 
 * @param {*} res 
 */
export const createProveedor = async (req, res)=> {
    /**
     * los ?? son para sustituir valores
     * 
     * req.body, contiene la información enviada por el cliente. esto es lo que debemos mandar como parámetro
     * a la consulta de sql.
     * 
     * [nombre,direccion,rfc]: indica el orden y los parámetros a insertar.
     * 
     * [rows]: hace un arreglo con el log del id
     * 
     * {
  "rows": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 6,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0
  }
}
     */
    const {nombre,direccion,tel,rfc} = req.body;
    const [rows] = await pool.query('INSERT INTO cliente (clienteNom,clienteDir,clienteTel,clienteRFC) VALUES (?,?,?,?)',[nombre,direccion,tel,rfc]);
    
    /**
     * esta es la respuesta que se recibe despúes de hacer la peticióny que enviamos después de la ejecución.
     * en este caso devuelve los datos insertados en la bd
     */
    res.send({
        id: rows.insertId,
        nombre,
        direccion,
        tel,
        rfc
    });
};


/**
 * función que actualiza proveedores
 * @param {*} req 
 * @param {*} res 
 */
export const updateProvedor = async (req, res)=> {
    const {id} = req.params;
    const {nombre,direccion} = req.body;

    const [result] = await pool.query('UPDATE cliente SET clienteNom = ?, clienteDir = ? WHERE clienteId = ?',[nombre,direccion,id]);

    if(result.affectedRows === 0) return res.status(404).json({
        message: 'proveedor no encontrado'
    });

    const [rows] = await pool.query('SELECT * FROM Cliente WHERE clienteId = ?',[id]);

    res.json(rows[0]);
};

/**
 * función que actualiza proveedores parcialmente
 * @param {*} req 
 * @param {*} res 
 */
export const patchProvedor = async (req, res)=> {
     const {id} = req.params;
    const {nombre,direccion,rfc} = req.body;

    /**
     * IFNULL(?, valoractual), si la entrada de información es nula, deja el valor que tiene actualmente
     */
    const [result] = await pool.query('UPDATE cliente SET clienteNom = IFNULL(?, clienteNom), clienteDir = IFNULL(?,clienteDir),clienteRFC = IFNULL(?,clienteRFC) WHERE clienteId = ?',[nombre,direccion,rfc,id]);

    if(result.affectedRows === 0) return res.status(404).json({
        message: 'proveedor no encontrado'
    });

    const [rows] = await pool.query('SELECT * FROM Cliente WHERE clienteId = ?',[id]);

    res.json(rows[0]);
};

export const deleteProveedor = async (req, res)=>{
    /**
     * aquí usé la tabla producto venta como prueba porque en Proveedor no se puede eliminar por ser tabla padre
     */
    const [result] = await pool.query("DELETE FROM cliente WHERE clienteId = ?", [req.params.id]);

    if(result.affectedRows <= 0) return res.status(404).json({
        message: 'No existe ese registro'
    });

    /**
     * todo va bien y no devuelve nada
     */
    res.sendStatus(204);
};
