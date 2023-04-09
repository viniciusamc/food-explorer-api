const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");
const knex = require("../database/knex");

class MealsController {
  async create(req, res) {
    const { name, desc, price, picture, ingredients } = req.body;

    const user_id = req.user.id;

    const admin = await knex("users").where("id", user_id).first();

    if (admin.role != "admin") {
      throw new AppError("User is not admin", 401);
    }

    const priceVerify =
      /^\s*((?:[1-9]\d{0,2}(?:\.\d{3})*)|(?:0))(\.\d{1,2})?\s*$/;

    if (!name || !desc || !price || !picture || !ingredients) {
      throw new AppError("Preencha todos os campos corretamente");
    }

    if (!priceVerify.test(price)) {
      throw new AppError("Apenas números no preço!");
    }

    const checkMeal = await knex("meals").where("name", name).first();

    if (checkMeal) {
      throw new AppError("Prato já existente.");
    }

    await knex("meals").insert({
      name,
      desc,
      price,
      picture,
      ingredients,
    });

    res.status(201).json({ name, desc, price, picture, ingredients });
  }

  async get(req, res) {
    const { id } = req.params;

    const list = await knex("meals").where("id", id);

    res.status(201).json({
      list,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const user_id = req.user.id;

    const admin = await knex("users").where("id", user_id).first();

    if (admin.role != "admin") {
      throw new AppError("User is not admin", 401);
    }

    const { confirmDelete } = req.body;

    if (!confirmDelete) {
      throw new AppError("Confirme primeiro!");
    }

    const getIdMeal = await knex("meals").where("id", id).first();

    if (!getIdMeal) {
      throw new AppError("Prato não existe!");
    }

    await knex("meals").where("id", id).first().delete();

    res.status(200).json("Deletado com sucesso!");
  }

  async index(req, res) {
    const getIndex = await knex.select("*").from("meals");

    res.status(200).json({ getIndex });
  }
}

module.exports = MealsController;
