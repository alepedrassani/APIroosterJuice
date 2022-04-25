const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const multer = require('multer');
const login = require('../middleware/login')
const ProdutosController = require('../controllers/produtos-controller')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({ 
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 *5
    },
    fileFilter : fileFilter
})


// const upload = multer( {storage : storage});


//retorna todos os produtos
router.get('/', ProdutosController.GetProdutos);

//insere um produto
router.post('/', upload.single('produto_imagem'), login.obrigatorio, ProdutosController.InsereUmProduto);

// reotrna os dados de um produto
router.get('/:id_produto', ProdutosController.GetUmProduto);

// altera um produto
router.patch('/',upload.single('produto_imagem'), login.obrigatorio,  ProdutosController.AlteraUmProduto)

//exlcui um produto
router.delete('/', login.obrigatorio, ProdutosController.DeletaUmPrduto)

module.exports = router;
