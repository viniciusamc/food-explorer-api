const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite")

class MealsController {
  async create(req,res){
    const { name, desc, price, picture, ingredients } = req.body

    res.status(201).json({name, desc, price, picture, ingredients})
  }
}

module.exports = MealsController;
