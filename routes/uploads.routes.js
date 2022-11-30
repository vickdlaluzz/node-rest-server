
const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, updateImg, getImg, updateImgCloudinary } = require('../controllers/uploads.controller');

const { isRoleValid, emailExists, existsById } = require('../helpers/dbValidators');
const { validarCampos } = require('../middlewares/fieldValidation');
const { fileValidation } = require('../middlewares/fileValidation');
const { validCollections } = require('../middlewares/validCollections');


const router = Router();

router.post('/', fileValidation, cargarArchivo);

router.put('/:collection/:id', [
    fileValidation,
    check('id', 'El id no es valido').isMongoId(),
    validCollections('usuarios', 'productos'),
    validarCampos
],updateImgCloudinary);


router.get('/:collection/:id', [
    check('id', 'El id no es valido').isMongoId(),
    validCollections('usuarios', 'productos'),
    validarCampos
], getImg)




module.exports = router;