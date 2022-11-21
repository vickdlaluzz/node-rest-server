const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');

const jwtValidation = async(req = request, res = response, next) => {
    const token = req.header('x-token');
    if (!token) return res.status(401).end();

    try {
        const { uid } = jwt.verify(token, process.env.JWTSECRET);
        const user = await usuario.findById(uid);
        req.user = user;
        if ( !user ) return res.status(401).end();
        if ( !user.estado ) return res.status(401).end();
        next();
    } catch (error) {
        console.warn('NO VALID TOKEN => ',error);
        res.status(401).end();
    }
}


module.exports = {
    jwtValidation
}