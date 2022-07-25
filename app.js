const express = require('express');
const app = express();

let rotasProdutos = require('./routes/routeProdutos')

app.use(express.json());

app.use('/produtos', rotasProdutos);

app.use('*',(req,res,next)=>{
    res.send('Error 404, Not found');
    next();
});


//Configurando Porta do Serv
app.listen(3001, () => {
    console.log('Servidor Online')
})

