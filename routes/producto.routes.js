
const { Router } = require('express');
const { check } = require('express-validator');
const { createProducto, getProductos, updateProducto, deleteProducto } = require('../controllers/producto.controller');

const { existCategoriaById, existProductoById } = require('../helpers/dbValidators');
const { validarCampos } = require('../middlewares/fieldValidation');
const { jwtValidation } = require('../middlewares/jwt-validation');
const {  hasRole } = require('../middlewares/roleValidation');


const router = Router();

router.post('/', [
    jwtValidation,
    check('nombre', 'El nombre de producto es obligatorio').notEmpty(),
    check('categoria', 'Es obligatorio indicar la categoria').notEmpty(),
    check('categoria', 'El id de categoria no es un id valido').isMongoId(),
    check('categoria').custom(existCategoriaById),
    validarCampos
], createProducto);



router.get('/', [
    jwtValidation,
    validarCampos
], getProductos);


router.put('/:id', [
    jwtValidation,
    check('id', 'No es un id de producto valido').isMongoId(),
    check('id').custom(existProductoById),
    check('nombre', 'El nombre de producto es obligatorio').notEmpty(),
    check('categoria', 'Es obligatorio indicar la categoria').notEmpty(),
    check('categoria', 'El id de categoria no es un id valido').isMongoId(),
    check('categoria').custom(existCategoriaById),
    check('disponible', 'Se debe indicar la disponibilidad del producto').notEmpty(),
    validarCampos
], updateProducto);


router.delete('/:id', [
    jwtValidation,
    check('id', 'No es un id de producto valido').isMongoId(),
    check('id').custom(existProductoById),
    validarCampos
], deleteProducto);

module.exports = router;