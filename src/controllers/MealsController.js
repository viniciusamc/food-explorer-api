const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite")

class MealsController {
  async create(req,res){
    const { name, desc, price, picture, ingredients } = req.body

    const priceVerify = new RegExp('^[0-9]+$');

    const database = await sqliteConnection();

    if(!name || !desc ||!price || !picture || !ingredients){
      throw new AppError("Preencha todos os campos corretamente");
    }

    if(!priceVerify.test(price)){
      throw new AppError("Apenas números no preço!");
    }

    const checkMeal = await database.get("SELECT * FROM foods WHERE name = (?)", [name])

    if(checkMeal) {
      throw new AppError("Prato já existente.");
    }

    await database.run("INSERT INTO foods (name, desc, price, picture, ingredients) VALUES (?,?,?,?,?)", 
    [name, desc, price, picture, ingredients])

    res.status(201).json({name, desc, price, picture, ingredients})
  }
}

module.exports = MealsController;
