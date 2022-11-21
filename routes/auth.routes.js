
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');

const { isRoleValid, emailExists, existsById } = require('../helpers/dbValidators');
const { validarCampos } = require('../middlewares/fieldValidation');


const router = Router();


router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contrasena es obligatoria').notEmpty(),
    validarCampos
], login );


module.exports = router;