const AppError = require("../utils/AppError");

class UserController{
  create(req, res){
    const { name, email, password } = req.body;

    if(!name || !email || !password){
      throw new AppError("Preencha todas as caixas corretamente");
    }
    
    res.status(201).json({name, email, password}) 
  }
}

module.exports = UserController;
