const mysql = require('../mysql').pool;



exports.getPedidos = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            'select * from pedidos',
            (error, result, fields) =>{
                if(error){return res.status(500).send({ error: error })}
                
               
                const response = {
                    quantidade: result.length,
                    produtos: result.map(pedido => {
                        return{
                        id_pedido: pedido.id_pedidos,
                        id_produto: pedido.id_produto,
                        quantidade: pedido.quantidade,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes de um produto especico',
                            url:'http://localhost:3000/pedidos/' + pedido.id_pedidos

                        }
                    }

                    })
                }

                return res.status(200).send(response);
            }
        )
    })
}

exports.PostUmPedido =  (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            'select * from Produtos where id_produto = ?', [req.body.id_produto],
            (error, result, field) => {
            if(error){return res.status(500).send({ error: error }) }
               
            if(result.length == 0) {
                return res.status(404).send({
                    menesagem: "Produto não encontrado"
                })
            }
           
        })
    }),
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            'INSERT INTO pedidos(id_produto, quantidade) VALUES(?,?)',
            [req.body.id_produto, req.body.quantidade],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error: error }) }
            
                const response = {
                    mensagem: 'Pedido inserido com sucesso',
                    pedidoCriado: {
                        id_pedido  : result.id_pedidos,
                        id_produto : req.body.id_produto,
                        quantidade : req.body.quantidade,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os pedidos',
                            url:'http://localhost:3000/pedidos/'

                        }
                    }
                }

                return res.status(201).send(response);
            }
        )
    })
}


exports.GetUmPedido = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            'select * from pedidos where id_pedidos = ?;',
            [req.params.id_pedido],
            (error, result, fields) =>{
                if(error){return res.status(500).send({ error: error })}
               if(result.length == 0) {
                   return res.status(404).send({
                       menesagem: "Não foi encontrado pedido com esse id"
                   })
               }
               
               
                const response = {
                    mensagem: 'Pedido encontrado com sucesso',
                    pedido: {
                        id_pedido  : result[0].id_pedidos,
                        id_produto : result[0].id_produto,
                        quantidade : result[0].quantidade,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os pedidos',
                            url:'http://localhost:3000/pedidos/'

                        }
                    }
                }

                return res.status(200).send(response);
            
            }
        )
    });
}

exports.DeletePedido = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            `DELETE FROM pedidos WHERE id_pedidos = ?`,[req.body.id_pedido],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error: error })}

                const response = {
                    mensagem: 'Pedido excluido com sucesso',
                    
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um pedido',
                        url:'http://localhost:3000/pedidos/',
                        body: {
                            id_produto: "number",
                            quantidade: "number"
                        }

                    }
                    
                }

                return res.status(201).send(response);
            }
        )
    })
}