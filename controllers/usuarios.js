const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res) => {
    try {
        const { nombre, email, pass } = req.body;

        // Validación básica
        if (!nombre || !email || !pass) {
            return res.status(400).json({
                error: 'Los campos nombre, email y pass son obligatorios'
            });
        }

        const usuario = await Usuario.create({ nombre, email, pass });
        return res.status(201).json(usuario);
    } catch (error) {
        // Errores de validación de Sequelize (email inválido, email repetido, etc.)
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                error: error.errors.map(e => e.message)
            });
        }

        console.error(error);
        return res.status(500).json({ error: 'Error al crear el usuario' });
    }
};


const obtenerUsuarios = async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
};


const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await Usuario.update(req.body, { where: { id } });
        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await Usuario.destroy({ where: { id } });
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { crearUsuario, obtenerUsuarios, actualizarUsuario, eliminarUsuario };
