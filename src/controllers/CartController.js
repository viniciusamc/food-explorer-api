const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class CartController {
  async create(req, res) {
    const { id, meal_id } = req.body;

    if (!id || !meal_id) {
      throw new AppError("Id Not Found");
    }

    await knex("cart").insert({ user_id: id, meal_id });

    return res.status(201).json({ id });
  }

  async delete(req, res) {
    const { user_id, meal_id } = req.body;

    if (!user_id || !meal_id) {
      throw new AppError("Id Not Found");
    }

    await knex("cart").delete().where({ user_id, meal_id });

    return res.status(200).json("Deleted with success");
  }

  async index(req, res) {
    const { id } = req.query;
    let cartCount = 0;

    if (!id) {
      throw new AppError("Id Not Found");
    }

    const cart = await knex("cart").where({ user_id: id }).select("meal_id");
    const cartIds = [];

    cart.forEach((cartItem) => {
      cartIds.push(knex("meals").select().where({ id: cartItem.meal_id }));
      cartCount++;
    });

    const itensCart = await Promise.all(cartIds);
    return res.status(200).json({ itensCart, cartCount });
  }
}

module.exports = CartController;
