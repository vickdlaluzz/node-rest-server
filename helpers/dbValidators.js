const Role = require('../models/role');
const Usuario = require('../models/usuario');


const isRoleValid = async(rol = '') => {
    const roleExsit = await Role.findOne({ role: rol });
    if (!roleExsit) throw new Error(`EL rol ${rol} no esta registrado en la base de datos.`);
}

const emailExists = async(email = '') => {
    const emailExists = await Usuario.findOne({ correo: email });
    if (emailExists) throw new Error('El correo ya esta registrado.');
}

const existsById = async( id ) => {
    const idExists = await Usuario.findById(id);
    if (!idExists) throw new Error('No existe el recurso solicitado.');
}

module.exports = {
    isRoleValid,
    emailExists,
    existsById
}