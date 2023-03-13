const knex = require("../database/knex");
const AppError = require("../utils/AppError");

async function authenticatedAdmin(req, res, next) {
  const user_id = request.user.id;

  const user = await knex("users").where({ id: user_id }).first();

  if (!user.admin) {
    throw new AppError("Not Admin", 401);
  }

  next();
}

module.exports = authenticatedAdmin;
