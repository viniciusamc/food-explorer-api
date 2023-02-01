const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");
const knex = require("../database/knex");

class MealsController {
  async create(req, res) {
    const { name, desc, price, picture, ingredients } = req.body;

    const priceVerify = new RegExp("^[0-9]+$");

    const database = await sqliteConnection();

    if (!name || !desc || !price || !picture || !ingredients) {
      throw new AppError("Preencha todos os campos corretamente");
    }

    if (!priceVerify.test(price)) {
      throw new AppError("Apenas números no preço!");
    }

    const checkMeal = await database.get(
      "SELECT * FROM meals WHERE name = (?)",
      [name]
    );

    if (checkMeal) {
      throw new AppError("Prato já existente.");
    }

    await database.run(
      "INSERT INTO meals (name, desc, price, picture, ingredients) VALUES (?,?,?,?,?)",
      [name, desc, price, picture, ingredients]
    );

    res.status(201).json({ name, desc, price, picture, ingredients });
  }

  async get(req, res) {
    const { id } = req.params;

    const database = await sqliteConnection();

    const list = await database.get("SELECT * FROM meals WHERE id = (?)", [id]);

    res.status(201).json({
      list,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const { confirmDelete } = req.body;

    const database = await sqliteConnection();

    if (!confirmDelete) {
      throw new AppError("Confirme primeiro!");
    }

    const getIdMeal = await database.get(
      "SELECT * FROM meals WHERE id = (?)",
      id
    );

    if (!getIdMeal) {
      throw new AppError("Prato não existe!");
    }

    await database.run("DELETE FROM meals WHERE id = (?)", [id]);

    return res.status(200);
  }

  async index(req, res) {
    const database = await sqliteConnection();
    const meals = await database.get("SELECT * FROM meals");
    res.status(200).json({ meals });
  }
}

module.exports = MealsController;
