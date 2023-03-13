const AppError = require("../utils/AppError");
const knex = require("../database/knex/index");
const bcrypt = require("bcrypt");

class UserController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const emailVerify = new RegExp(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );

    if (!name || !email || !password) {
      throw new AppError("Preencha todas as caixas corretamente");
    }

    const checkEmail = await knex("users").where("email", email).first();

    if (checkEmail) {
      throw new AppError(
        "Desculpe, este endereço de e-mail já está em uso. Por favor, escolha outro endereço de e-mail ou faça login."
      );
    }

    if (name.length < 3) {
      throw new AppError(
        "Desculpe, o nome precisa ter pelo menos 3 caracteres para ser válido. Por favor, tente novamente. "
      );
    }

    if (password.length < 6) {
      throw new AppError("A senha deve ter no mínimo 6 caracteres.");
    }

    const passwordHash = bcrypt.hashSync(password, 12);

    if (!emailVerify.test(email)) {
      throw new AppError("Endereço de e-mail inválido");
    }

    await knex("users").insert({ name, email, password: passwordHash });

    res.status(201).json({ name, email, password });
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await knex("users").select().where({ id });
    const favorites = await knex("favorites").select().where({ user_id: id });
    const cart = await knex("cart").select().where({ user_id: id });

    res.status(200).json({ user, favorites, cart });
  }
}

module.exports = UserController;
