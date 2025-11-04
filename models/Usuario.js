const { DataTypes } = require('sequelize');
//const sequelize = require('./database');
const sequelize = require('../tests/configTestDb');

const Usuario = sequelize.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true, 
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    timestamps: false // Deshabilita createdAt y updatedAt
});

module.exports = Usuario;
