const { request, response } = require("express");
const bcrypt = require('bcryptjs');

const usuario = require("../models/usuario");
const { jwtGenerator } = require("../helpers/jwt-generator");

const login  = async(req = request, res = response) => {
    const  { correo, password } = req.body;
    const msg = 'Usuario o contrasena incorrecta';
    try {
        // Verificar si el email existe
        const user = await usuario.findOne({ correo });
        if (!user) return res.status(400).json({ msg });
        // Verificar si esta activo
        if (!user.estado) return res.status(400).json({ msg });
        // Verificar el pass'
        const validPass = bcrypt.compareSync( password, user.password);
        if (!validPass) return res.status(400).json({ msg });

        // Generar JWT
        const tkn = await jwtGenerator(user.id);

        res.json({
            user,
            token: tkn
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador.'
        })
    }

}


module.exports = {
    login
}