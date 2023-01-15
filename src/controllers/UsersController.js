const AppError = require("../utils/AppError");
require database = require("../database/sqlite")


class UserController{
  async create(req, res){
    const { name, email, password } = req.body;
    const emailVerify = new RegExp (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)

    if(!name || !email || !password){
      throw new AppError("Preencha todas as caixas corretamente");
    }

    if(name.length < 3) {
      throw new AppError("Desculpe, o nome precisa ter pelo menos 3 caracteres para ser válido. Por favor, tente novamente. ");
    }

    if(password.length < 6) {
      throw new AppError("A senha deve ter no mínimo 6 caracteres.");
    }

    if(!emailVerify.test(email)) {
      throw new AppError("Endereço de e-mail inválido");
    }
    
    await database.run("INSERT INTO users (name, email, password) VALUES (?,?,?)",
    [name, email, password]
    )
    
    res.status(201).json({name, email, password}) 
  }
}

module.exports = UserController;
