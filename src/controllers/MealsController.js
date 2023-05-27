const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class MealsController {
  async create(req, res) {
    const { name, desc, price, category, ingredients, user_id } = req.body;
    const { filename: picture } = req.file;

    const diskStorage = new DiskStorage();

    const filename = await diskStorage.saveFile(picture);

    const admin = await knex("users").where("id", user_id).first();

    if (admin.role != "admin") {
      throw new AppError("User is not admin", 401);
    }

    if (!name || !desc || !price || !category || !ingredients) {
      throw new AppError("Preencha todos os campos corretamente");
    }

    // if (!priceVerify.test(price)) {
    //   throw new AppError("Apenas números no preço!");
    // }

    const checkMeal = await knex("meals").where("name", name).first();

    if (checkMeal) {
      throw new AppError("Prato já existente.");
    }

    await knex("meals").insert({
      name,
      desc,
      picture,
      price,
      category,
      ingredients,
    });

    res.status(201).json("Prato criado com sucesso!");
  }

  async get(req, res) {
    const { id } = req.params;

    const meal = await knex("meals").where("id", id).first();
    meal.ingredients = meal.ingredients.split(" ");

    res.status(200).json(meal);
  }

  async delete(req, res) {
    const { id } = req.params;

    const user_id = req.user.id;

    const admin = await knex("users").where("id", user_id).first();

    if (admin.role != "admin") {
      throw new AppError("User is not admin", 401);
    }

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
    const { name, ingredients, category } = req.query;

    if (category) {
      const meals = await knex("meals").where("category", category);
      return res.status(200).json(meals);
    }

    if (ingredients) {
      const filterIngredients = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());

      const meals = await knex("meals")
        .whereLike("ingredients", `%${filterIngredients}%`)
        .groupBy("id");
      return res.status(200).json(meals);
    } else {
      const meals = await knex("meals").whereLike("name", `%${name}%`);
      return res.status(200).json(meals);
    }
  }
}

module.exports = MealsController;
