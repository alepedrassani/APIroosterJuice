const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

const PedidosController = require('../controllers/pedidos-controller')

//retorna todos os pedidos
router.get('/', PedidosController.getPedidos);

//insere um pedido
router.post('/', PedidosController.PostUmPedido)


// reotrna os dados de um pedido
router.get('/:id_pedido', PedidosController.GetUmPedido);


//exlcui um pedido
router.delete('/', PedidosController.DeletePedido)

module.exports = router;
