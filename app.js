// app.js
const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const app = express();
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const port = 3000;
require('dotenv').config()
app.use(express.json())



//models

const User = require('./models/User')


// Configurar o diretório público para servir arquivos estáticos
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/images' , express.static(path.join(__dirname, 'src/Front-End/login-legal/assets/images')));
app.use('/css' , express.static(path.join(__dirname, 'src/Front-End/login-legal/assets/css')));
app.use('/js' , express.static(path.join(__dirname, 'src/Front-End/login-legal/assets/js')));
app.use(express.static(path.join(__dirname, 'src/Front-End')));



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Front-End', 'index.html'));
});

//private route

app.get('/user/:id', checkToken, async (req, res) => {

  const id = req.params.id

  // check if exist
  const user = await User.findById(id, '-password')

  if (!user) {
    return res.status(404).json({msg: "usuario nao encontrado"})
  }

  res.status(200).json({user})
})

function checkToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({msg: "Acesso negado"})
  }

  try {
    const secret = process.env.SECRET
    jwt.verify(token, secret)

    next()

  } catch (err) {
    res.status(400).json({msg: "Token invalido"})
  }

}
app.get('/loja', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/Front-End', 'loja.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/Front-End/login-legal/assets', './html/signup.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/Front-End/login-legal/assets', './html/signin.html'));
});

//register user

app.post('/auth/register', async(req, res) => {
  const {name, email, password, confirmpassword} = req.body;

  //validation

  if(!name) {
    return res.status(422).json({msg: "o nome é obrigatório"})
  }

  if(!email) {
    return res.status(422).json({msg: "o email é obrigatório"})
  }

  if(!password) {
    return res.status(422).json({msg: "a senha é obrigatório"})
  }

  if (password !== confirmpassword) {
    res.status(422).json({msg: "as senhas não conferem"})
  }

  // check if user exist
  const userExist = await User.findOne({email: email})

  if(userExist) {
    res.status(422).json({msg: "por favor, utilize outro email"})
  }

  //create password
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt);

  //create user
  const user = new User({
    name,
    email,
    password: passwordHash,
  })

  try {
    await user.save()

    res.status(201).json({msg: "Usuario criado com sucesso"})
    

  }

  catch(error) {
    console.log(error)
    res.status(500).json({msg: "Aconteceu um erro no servidor"});
  }

})


//login

app.post('/auth/login', async (req, res) => {
  const {email, password} = req.body

  if(!email) {
    return res.status(422).json({msg: "o email é obrigatório"})
  }

  if(!password) {
    return res.status(422).json({msg: "a senha é obrigatória"})
  }

  //check if user exist
  const user = await User.findOne({email: email})

  if(!user) {
   return res.status(404).json({msg: "usuario nao encontrado"})
  }

  //check if password math
  const checkPassword = await bcrypt.compare(password, user.password)

  if (!checkPassword) {
    return res.status(422).json({msg: "senha invalida"})
  }

  try {
    const secret = process.env.SECRET 

      const token = jwt.sign({
        id: user._id,

      },
      secret,)

      res.status(200).json({msg: "Autenticação realizada com sucesso", token})
  }
   catch (err) {
    console.log(err)
    res.status(500).json({msg: "Aconteceu um erro no servidor"});
  }
})

const dbUSer = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

// mongoose
// .connect(`mongodb+srv://${dbUSer}:${dbPassword}@cluster0.hufjqjo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
//   app.listen(port, () => {
//     console.log(`Conectou ao banco`);
//   });
// }).catch((err) => {
//   console.log(err);
// })

app.listen(port, () => {
      console.log(`Conectou ao server`);
    });