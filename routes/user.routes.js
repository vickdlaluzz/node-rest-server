
const { Router } = require('express');
const { getUsuarios, updateUsuario, createUsuario, deleteUsuario, patchUsuario } = require('../controllers/user.controller');


const router = Router();


// Obtiene todos los usuarios
router.get('/', getUsuarios );

// Actualizar usuario
router.put('/:id', updateUsuario);

// Crear usuario
router.post('/', createUsuario);

// Eliminar usuario
router.delete('/', deleteUsuario);

// patch usuario
router.patch('/', patchUsuario);


module.exports = router;