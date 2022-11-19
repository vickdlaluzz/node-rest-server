const Role = require('../models/role');
const Usuario = require('../models/usuario');


const isRoleValid = async(rol = '') => {
    const roleExsit = await Role.findOne({ role: rol });
    if (!roleExsit) throw new Error(`EL rol ${rol} no esta registrado en la base de datos.`);
}

const emailExists = async(email = '') => {
    console.log('hola desde emailExists');
    const emailExists = await Usuario.findOne({ correo: email });
    console.log(emailExists);
    if (emailExists) throw new Error('El correo ya esta registrado.');
}

module.exports = {
    isRoleValid,
    emailExists
}