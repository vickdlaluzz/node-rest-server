const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsuarios = async(req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { estado: true };
    // const usuarios = await Usuario.find(query)
    //                     .skip(Number(from))
    //                     .limit(Number(limit));
    // const total = await Usuario.countDocuments(query);
    const [ users, total ] = await Promise.all([
                    Usuario.find(query)
                        .skip(Number(from))
                        .limit(Number(limit)),
                    Usuario.countDocuments(query)
    ])
    res.json({
        total,
        elements: users.length,
        users
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

const updateUsuario = async(req, res = response) => {
    const {id} = req.params;
    const { nombre } = req.body;
    let usuario = await Usuario.findById(id);
    usuario.nombre = nombre;
    usuario = await Usuario.findByIdAndUpdate(id,usuario);
    res.json({
        msg: 'Usuario actualizado correctamente',
        usuario
    })
}

const deleteUsuario = async(req, res = response) => {
    const { id } = req.params;
    const user = await Usuario.findByIdAndUpdate(id, { estado: false })
    
    res.json({
        msg: 'EL usuario ha sido eliminado',
        deletedUser: user
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