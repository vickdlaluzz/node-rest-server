
const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, updateUsuario, createUsuario, deleteUsuario, patchUsuario } = require('../controllers/user.controller');
const { isRoleValid, emailExists, existsById } = require('../helpers/dbValidators');
const { validarCampos } = require('../middlewares/fieldValidation');
const { jwtValidation } = require('../middlewares/jwt-validation');
const { isAdmin, hasRole } = require('../middlewares/roleValidation');


const router = Router();


// Obtiene todos los usuarios
router.get('/',[
    jwtValidation,

],getUsuarios );

// Actualizar usuario
router.put('/:id',[
    jwtValidation,
    isAdmin,
    check('id', 'No es un id valido').isMongoId(),
    check('id', 'No existe el recurso solicitado').custom(existsById),
    check('nombre','El campo nombre es obligatorio').notEmpty(),
    validarCampos
], updateUsuario);

// Crear usuario
router.post('/',[
    jwtValidation,
    hasRole('ADMIN_ROLE'),
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
router.delete('/:id',[
    jwtValidation,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id', 'No existe el recurso solicitado').custom(existsById),
    validarCampos
],  deleteUsuario);

// patch usuario
router.patch('/',[
    jwtValidation,
], patchUsuario);


module.exports = router;