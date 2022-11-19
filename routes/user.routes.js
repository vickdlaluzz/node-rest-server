
const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, updateUsuario, createUsuario, deleteUsuario, patchUsuario } = require('../controllers/user.controller');
const { isRoleValid, emailExists } = require('../helpers/dbValidators');
const { validarCampos } = require('../middlewares/fieldValidation');


const router = Router();


// Obtiene todos los usuarios
router.get('/', getUsuarios );

// Actualizar usuario
router.put('/:id', updateUsuario);

// Crear usuario
router.post('/',[
    check('correo','El correo no es valido').isEmail(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contrasena es obligatoria').not().isEmpty(),
    check('password','La contrasena debe tener al menos 6 caracteres').isLength({min: 6}),
    // check('rol','El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(isRoleValid),
    check('correo').custom(emailExists),
    validarCampos
], createUsuario);

// Eliminar usuario
router.delete('/', deleteUsuario);

// patch usuario
router.patch('/', patchUsuario);


module.exports = router;