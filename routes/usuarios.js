const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsuariosController = require('../controllers/usuarios-controller')

router.post('/cadastro', UsuariosController.CadastrarUmUsuario)

router.post('/login', UsuariosController.LoginUsuario)


module.exports = router;