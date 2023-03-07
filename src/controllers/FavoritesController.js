const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class FavoritesController {
  async create(req, res) {
    const { id, meal_id } = req.body;

    if (!id) {
      throw new AppError("Id Not Found");
    }

    await knex("favorites").insert({ user_id: id, meal_id });

    return res.status(201).json({ id });
  }
}

module.exports = FavoritesController;
