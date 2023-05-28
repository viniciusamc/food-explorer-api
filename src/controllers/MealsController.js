const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class MealsController {
  async create(req, res) {
    const { name, desc, price, category, ingredients, user_id } = req.body;
    const { filename: picture } = req.file;

    const diskStorage = new DiskStorage();

    const savedImage = await diskStorage.saveFile(picture);

    const admin = await knex("users").where("id", user_id).first();

    if (admin.role != "admin") {
      savedImage.deleteFile(picture);
      throw new AppError("User is not admin", 401);
    }

    if (!name || !desc || !price || !category || !ingredients) {
      savedImage.deleteFile(picture);
      throw new AppError("Preencha todos os campos corretamente");
    }

    // if (!priceVerify.test(price)) {
    //   throw new AppError("Apenas números no preço!");
    // }

    const checkMeal = await knex("meals").where("name", name).first();

    if (checkMeal) {
      throw new AppError("Prato já existente.");
    }

    let ingredientsVerify = ingredients.replace(/[\[\]"]/g, "");
    ingredientsVerify = ingredientsVerify.replace(/,/g, " ");

    console.log(ingredientsVerify);
    await knex("meals").insert({
      name,
      desc,
      picture,
      price,
      category,
      ingredients: ingredientsVerify,
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

  async update(req, res) {
    const { name, desc, price, category, ingredients } = req.body;
    const { id } = req.params;
    const { file } = req;

    const meal = await knex("meals").where("id", id).first();

    if (!meal) {
      throw new AppError("Prato não existe!");
    }

    const diskStorage = new DiskStorage();
    let savedImage = meal.picture;

    if (file && file.filename) {
      const { filename: picture } = file;
      savedImage = await diskStorage.saveFile(picture);
    }

    meal.name = name ?? meal.name;
    meal.desc = desc ?? meal.desc;
    meal.price = price ?? meal.price;
    meal.category = category ?? meal.category;
    meal.ingredients = ingredients ?? meal.ingredients;
    meal.picture = savedImage;

    await knex("meals").where("id", id).first().update({
      name: meal.name,
      desc: meal.desc,
      price: meal.price,
      category: meal.category,
      ingredients: meal.ingredients,
      picture: meal.picture,
    });

    res.status(200).json("Prato atualizado com sucesso!");
  }
}

module.exports = MealsController;
