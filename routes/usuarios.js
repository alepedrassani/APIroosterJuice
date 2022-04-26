const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/usuarios-controller')

router.post('/cadastro', UsuariosController.CadastrarUmUsuario)

router.post('/login', UsuariosController.LoginUsuario)


module.exports = router;