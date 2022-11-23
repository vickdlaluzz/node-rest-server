
const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, 
        getCategorias,
        getCategoriaById, 
        updateCategoria,
        deleteCategoria} = require('../controllers/categoria.controller');

const { existCategoriaById } = require('../helpers/dbValidators');
const { validarCampos } = require('../middlewares/fieldValidation');
const { jwtValidation } = require('../middlewares/jwt-validation');
const {  hasRole } = require('../middlewares/roleValidation');


const router = Router();


router.post('/',[
    jwtValidation,
    hasRole('ADMIN_ROLE'),
    check('nombre','El nombre es obligatorio').notEmpty(),
    validarCampos
], crearCategoria);

router.get('/', [
    jwtValidation
], getCategorias);

router.get('/:id', [
    jwtValidation,
    check('id', 'No es una id valido').isMongoId(),
    check('id').custom(existCategoriaById),
    validarCampos
], getCategoriaById);

router.put('/:id',[
    jwtValidation,
    check('id', 'No es una id valido').isMongoId(),
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('id').custom(existCategoriaById),
    validarCampos
], updateCategoria);

router.delete('/:id', [
    jwtValidation,
    check('id', 'No es una id valido').isMongoId(),
    hasRole('ADMIN_ROLE'),
    check('id').custom(existCategoriaById),
    validarCampos
], deleteCategoria)

module.exports = router;