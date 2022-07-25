const express = require('express');
const app = express();

let rotasProdutos = require('./routes/routeProdutos')
let rotasUsers = require('./routes/users');

app.use(express.json()); 

app.use('/produtos', rotasProdutos);
app.use("/api/users", rotasUsers) 

app.use('*',(req,res,next)=>{
    res.send('Error 404, Not found');
    next();
});


//Configurando Porta do Serv
app.listen(3001, () => {
    console.log('Servidor Online')
})

