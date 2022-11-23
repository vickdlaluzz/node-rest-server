
const { Router } = require('express');
const { check } = require('express-validator');
const { buscar } = require('../controllers/busqueda.controller');
const { validarCampos } = require('../middlewares/fieldValidation');
const { jwtValidation } = require('../middlewares/jwt-validation');




const router = Router();

router.get('/:coleccion/:termino',[
    jwtValidation,
    validarCampos
], buscar );


module.exports = router;