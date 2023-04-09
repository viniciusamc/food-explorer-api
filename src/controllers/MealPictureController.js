const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class MealPicutreController {
  async update(req, res) {
    const diskStorage = new DiskStorage();

    const { id } = req.params;
    const mealPictureName = req.file;

    const picture = await knex("meals").where({ id }).first();

    if (!id) {
      throw new AppError("Id not found", 404);
    }

    console.log({ id });

    if (!picture) {
      throw new AppError("Meal not found", 404);
    }

    const filename = await diskStorage.saveFile(mealPictureName);

    const meal = await knex("meals")
      .where({ id })
      .update({ picture: filename });

    return res.status(200).json(meal);
  }
}

module.exports = MealPicutreController;
