const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsuarios = (req = request, res = response) => {
    const { name = 'no name', perro, gato } = req.query;
    res.json({
        msg: 'get API - controller',
        perro,
        gato,
        name
    })
}

const createUsuario = async(req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    // Encriptar el password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(usuario.password, salt);
    // Guardar usuario
    await usuario.save();
    res.json({
        msg: 'post API - controller',
        usuario
    })
}

const updateUsuario = (req, res = response) => {
    const id = req.params;
    res.json({
        msg: 'put API - controller',
        param: id
    })
}

const deleteUsuario = (req, res = response) => {
    res.json({
        msg: 'delete API - controller'
    })
}

const patchUsuario = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
    })
}


module.exports = {
    getUsuarios,
    createUsuario,
    updateUsuario,
    patchUsuario,
    deleteUsuario
}