const { response, request } = require('express');


const getUsuarios = (req = request, res = response) => {
    const { name = 'no name', perro, gato } = req.query;
    res.json({
        msg: 'get API - controller',
        perro,
        gato,
        name
    })
}

const createUsuario = (req, res = response) => {
    const body = req.body;
    res.json({
        msg: 'post API - controller',
        body
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