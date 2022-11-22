
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');

const { isRoleValid, emailExists, existsById } = require('../helpers/dbValidators');
const { validarCampos } = require('../middlewares/fieldValidation');


const router = Router();


router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contrasena es obligatoria').notEmpty(),
    validarCampos
], login );


router.post('/google_login',[
    check('id_token', 'El id_token es necesario').notEmpty(),
    validarCampos
], googleSignIn );


module.exports = router;