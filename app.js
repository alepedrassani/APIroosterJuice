const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaProdutos = require('./routes/produtos')
const rotaPedidos  = require('./routes/pedidos')
const rotaUsuarios = require('./routes/usuarios')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false })); //apenas dados simples
app.use(bodyParser.json()); //json de entrada no body

app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origen', '*');
    res.header(
        'Acess-Control-Allow-Header',
        'Content-Type',
        'Origen, X-Requerested-With,Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS'){
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }    

    next();
})

app.use('/produtos', rotaProdutos);
app.use('/pedidos' , rotaPedidos);
app.use('/usuarios' , rotaUsuarios);
app.use('/uploads', express.static('uploads'))


//QUANDO NÃO ENCONTRA ROTA ENTRA AQUI:
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app;