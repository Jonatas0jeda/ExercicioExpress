const express = require('express');
let usersOBJ = require('../usersOBJ')
const routes = express.Router();

//Adicionando User
routes.post("/", (req, res) => {
  const user = req.body;
  usersOBJ.push(user);
  return res.status(201).json({user});
});

//Modificar User
routes.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const content = req.body;

    const user = usersOBJ.find((useer) => useer.id === id);

    if (!user) {
        return res.status(400).json({ "message": "Produto nao encontrado" })
    }

    const userAtt = usersOBJ.map((useer) => {
        if (useer.id === id) {
            return content; 
        }
        return useer;
    })
    usersOBJ = userAtt;
    res.status(200).json(usersOBJ);
})

//Deletando 
routes.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const users = usersOBJ.find((useer) => useer.id === id)

    if (!users) {
        return res.status(400).json({ "message": "Produto nao encontrado" })
    }

    usersOBJ = usersOBJ.filter((useer) => useer.id !== id)
    res.status(200).json(usersOBJ);
})

//Lista de Users
routes.get('/', (req, res) => {
    res.status(200).json(usersOBJ);
})




//Bonus
routes.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { password } = req.body;


    const User = usersOBJ.filter((user) => user.id === Number(id));
  
  
    const update = usersOBJ.map((user) => {
      if(user.id === Number(id)) {
        return { ...user, password };
      };
  
      return user;
    });
  
    usersOBJ = update;
  
    res.status(200).json(usersOBJ);
  });

module.exports = routes;