const mysql = require('../mysql').pool;


exports.GetProdutos = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            'select * from Produtos',
            (error, result, fields) =>{
                if(error){return res.status(500).send({ error: error })}
                
               
                const response = {
                    quantidade: result.length,
                    produtos: result.map(prod => {
                        return{
                        id_produto: prod.id_produto,
                        nome: prod.nome,
                        preco: prod.preco,
                        imagem_produto: prod.imagem_produto,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes de um produto especico',
                            url:'http://localhost:3000/produtos/' + prod.id_produto

                        }
                    }

                    })
                }

                return res.status(200).send(response);
            }
        )
    })

}

exports.InsereUmProduto = (req, res, next) => {
    console.log(req.file);

    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            'INSERT INTO Produtos(nome, preco, imagem_produto) VALUES(?,?, ?)',
            [
                req.body.name, 
                req.body.preco,
                req.file.path
            ],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error: error }) }

                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produtoCriado: {
                        id_produto : result.id_produto,
                        nome       : req.body.name,
                        preco      : req.body.preco,
                        imagem     : req.file.path,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os produtos',
                            url:'http://localhost:3000/produtos/'

                        }
                    }
                }

                return res.status(201).send(response);
            }
        )
    });
}

exports.GetUmProduto = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
       if(error){return res.status(500).send({ error: error })}
       conn.query(
           'select * from Produtos where id_produto = ?;',
           [req.params.id_produto],
           (error, result, fields) =>{
               if(error){return res.status(500).send({ error: error })}
              if(result.length == 0) {
                  return res.status(404).send({
                      menesagem: "Não foi encontrado produto com esse id"
                  })
              }
              
              
               const response = {
                   mensagem: 'Produto encontrado com sucesso',
                   produto: {
                       id_produto : result[0].id_produto,
                       nome       : result[0].nome,
                       preco      : result[0].preco,
                       imagem_produto : result[0].imagem_produto,
                       request: {
                           tipo: 'GET',
                           descricao: 'Retorna todos os produtos',
                           url:'http://localhost:3000/produtos/'

                       }
                   }
               }

               return res.status(200).send(response);
           
           }
       )
   });
}



exports.AlteraUmProduto = (req, res, next) => {

    console.log(req.file);

    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            `UPDATE Produtos
                SET nome          = ?,
                    preco         = ?,
                    imagem_produto = ?
                WHERE id_produto  = ?`,
            [
                req.body.name,
                req.body.preco, 
                req.file.path,
                req.body.id_produto
            ],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error: error })}
               
                const response = {
                    mensagem: 'Produto alterado com sucesso',
                    produtoAlterado: {
                        id_produto : result.id_produto,
                        nome       : req.body.nome,
                        preco      : req.body.preco,
                        imagem_produto : req.file.path,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os produtos',
                            url:'http://localhost:3000/produtos/'

                        }
                    }
                }

                return res.status(201).send(response);
            }
        )
    })

}

exports.DeletaUmPrduto = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            `DELETE FROM Produtos WHERE id_produto = ?`,[req.body.id_produto],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error: error })}

                const response = {
                    mensagem: 'Produto excluido com sucesso',
                    
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um produtos',
                        url:'http://localhost:3000/produtos/',
                        body: {
                            nome: "String",
                            preco: "number"
                        }

                    }
                    
                }

                return res.status(201).send(response);
            }
        )
    })
}