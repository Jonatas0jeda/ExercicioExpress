const express = require('express');
const app = express();
let produtos = require('./produtos')

app.use(express.json());


//Adicionando 4 Produtos de uma vez
app.post('/produtos', (req, res) => {
    const content = req.body;
    const newProducts = [...produtos, ...content]
    res.status(201).json(newProducts);
})

//Modificando alguns dos Produtos por ID
app.put('/produtos/:id', (req, res) => {
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


//Deletando por ID
app.delete('/produtos/:id', (req, res) => {
    const id = Number(req.params.id)
    const products = produtos.find((produto) => produto.id === id)

    if (!products) {
        return res.status(400).json({ "message": "Produto nao encontrado" })
    }

    produtos = produtos.filter((produto) => produto.id !== id)
    res.status(200).json(produtos);

})


//Get para Verificar os Modificados
app.get('/produtos', (req, res) => {
    res.status(200).json(produtos);
})




//Configurando Porta do Serv
app.listen(3001, () => {
    console.log('Servidor Online')
})

