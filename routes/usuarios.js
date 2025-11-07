const { Router } = require('express');
const { check } = require('express-validator');
const swaggerJsdoc = require('swagger-jsdoc'); 
const swaggerUi = require('swagger-ui-express');

const { crearUsuario, obtenerUsuarios, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios');

const router = Router();
router.post('/', crearUsuario);
router.get('/', obtenerUsuarios);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

const { validarJWT } = require('../middlewares/validar-jwt');


/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *   post:
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Datos inválidos
 */

router.put('/:id', [
    validarJWT, 
    check('id', 'No es un ID válido').isInt(),
], actualizarUsuario);
router.delete('/:id', [
    validarJWT, 
    check('id', 'No es un ID válido').isInt(),
], eliminarUsuario);

module.exports = router;
