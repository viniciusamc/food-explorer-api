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

  async update(req, res) {
    const { name, email, password, newPassword, confirmNewPassword } = req.body;

    if (newPassword != confirmNewPassword) {
      throw new AppError("Senha não confere", 401);
    }

    if (newPassword.length < 6) {
      throw new AppError("A senha deve ter no mínimo 6 caracteres.");
    }

    const userVerify = await knex("users").select().where({ email }).first();

    if (!userVerify) {
      throw new AppError("Email/User não encontrado", 404);
    }

    const passwordVerify = await bcrypt.compare(password, userVerify.password);

    if (!passwordVerify) {
      throw new AppError("Senha não confere", 401);
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await knex("users")
      .select()
      .where({ email })
      .update()
      .where(passwordVerify, passwordHash);

    console.log(`${passwordVerify}`);

    res.status(201).json({ userVerify });
  }
}

module.exports = UserController;
