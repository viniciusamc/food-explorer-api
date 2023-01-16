const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite")
const bcrypt = require('bcrypt');

class UserController{
  async create(req, res){
    const { name, email, password } = req.body;

    const emailVerify = new RegExp (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)

    const database = await sqliteConnection();

    if(!name || !email || !password){
      throw new AppError("Preencha todas as caixas corretamente");
    }
    
    const checkEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    
    if(checkEmail){
      throw new AppError("Desculpe, este endereço de e-mail já está em uso. Por favor, escolha outro endereço de e-mail ou faça login.");
    }

    if(name.length < 3) {
      throw new AppError("Desculpe, o nome precisa ter pelo menos 3 caracteres para ser válido. Por favor, tente novamente. ");
    }

    if(password.length < 6) {
      throw new AppError("A senha deve ter no mínimo 6 caracteres.");
    }

    const hash = bcrypt.hashSync(password, 10);


    if(!emailVerify.test(email)) {
      throw new AppError("Endereço de e-mail inválido");
    }
    
    await database.run("INSERT INTO users (name, email, password) VALUES (?,?,?)",
    [name, email, hash]
    )
    
    res.status(201).json({name, email, password, hash}) 
  }

  async update(req, res){
    const { name, email, password } = req.body;

    res.status(201).json({name, email, password})
  }
}

module.exports = UserController;
