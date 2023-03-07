const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class FavoritesController {
  async create(req, res) {
    const { id, meal_id } = req.body;

    if (!id || !meal_id) {
      throw new AppError("Id Not Found");
    }

    await knex("favorites").insert({ user_id: id, meal_id });

    return res.status(201).json({ id });
  }

  async delete(req, res) {
    const { id, meal_id } = req.body;

    if (!id || !meal_id) {
      throw new AppError("Id Not Found");
    }

    await knex("favorites").delete().where({ user_id: id, meal_id });

    return res.status(200).json("Deleted with success");
  }

  async index(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new AppError("Id Not Found");
    }

    const favorites = await knex("favorites").where({ user_id: id });

    return res.status(200).json({ favorites });
  }
}

module.exports = FavoritesController;
