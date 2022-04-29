const mysql = require('../mysql').pool;

exports.DeletaUmaImagem = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            `DELETE FROM imagens_produtos WHERE id_imagem = ?`,
            [req.params.id_imagem],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error: error })}

                const response = {
                    mensagem: 'Imagem removida com sucesso',
                    
                    // request: {
                    //     tipo: 'POST',
                    //     descricao: 'Insere uma imagem',
                    //     url:'http://localhost:3000/produtos/',
                    //     body: {
                    //         nome: "String",
                    //         preco: "number"
                    //     }

                    // }
                    
                }

                return res.status(201).send(response);
            }
        )
    })
}