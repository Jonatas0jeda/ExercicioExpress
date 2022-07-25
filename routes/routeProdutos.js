const express = require('express');
const routes = express.Router();
let produtos = require('../produtos')


//Validando se ID existe
function validateExist(req,res,next){
    const id = Number(req.params.id);
    const existsID = produtos.find((produto)=> produto.id === id)
    if (!existsID){
        return res.status(400).json({ "message": "Produto nao encontrado" })
    }
    next();
}

//Validando Preço
function validatePrice(req,res,next){
    const {price} = req.body;

    if(price && price >= 0){ 
        next();
    }

   return res.status(400).send('Produto sem preço')
}


//Retornando todos os produtos = EX1
routes.get('/', (req, res) => {
    res.status(200).json(produtos);
})

//Obter um produto por ID = EX2
routes.get('/:id', validateExist, (req, res) => {
    const id = Number(req.params.id);
    const products = produtos.filter((produto) => produto.id === id);
    return res.status(200).json(products);

})



//Adicionando novo Produto = EX3
routes.post('/', validatePrice, (req, res) => {
    const content = req.body;
    const newProducts = [...produtos, content]
   return res.status(201).json(newProducts);
})



//Modificando alguns dos Produtos por ID = EX4
routes.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const content = req.body;

    const products = produtos.find((produto) => produto.id === id);

    if (!products) {
        return res.status(400).json({ "message": "Produto nao encontrado" })
    }

    const produtoAtt = produtos.map((produto) => {
        if (produto.id === id) {
            return content; 
        }
        return produto;
    })
    produtos = produtoAtt;
    res.status(200).json(produtos);
})


//Deletando por ID = EX5
routes.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const products = produtos.find((produto) => produto.id === id)

    if (!products) {
        return res.status(400).json({ "message": "Produto nao encontrado" })
    }

    produtos = produtos.filter((produto) => produto.id !== id)
    res.status(200).json(produtos);

})



module.exports = routes;