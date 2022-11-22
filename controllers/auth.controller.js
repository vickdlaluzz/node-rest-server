const { request, response } = require("express");
const bcrypt = require('bcryptjs');

const Usuario = require("../models/usuario");
const { jwtGenerator } = require("../helpers/jwt-generator");
const { googleVerify } = require("../helpers/google-verify");
const usuario = require("../models/usuario");

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

const googleSignIn = async(req = request, res = response) => {
    const  { id_token } = req.body;

    try {
        const { correo, nombre , img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: 'signed with google',
                img,
                google: true,
                rol: 'USER_ROLE'
            }
            usuario = new Usuario(data);
            usuario = await Usuario.create(usuario);
        }
        if (!usuario.estado) return res.status(401).json({
            msg: 'Ya existe una cuenta asociada a este email pero esta desactivada. Contacte al administador.'
        })

        const token = await jwtGenerator(usuario.id);
        
        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'No fue posible verificar el usuario'
        })
    }
}

module.exports = {
    login,
    googleSignIn
}