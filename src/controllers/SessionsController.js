const knex = require("../database/knex/index");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");
const { compare } = require("bcrypt");

class SessionsController {
  async create(req, res) {
    const { email, password, admin } = req.body;

    const user = await knex("users").where("email", email).first();

    if (!user) {
      throw new AppError("Email e/ou senha incorretos", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email e/ou senha incorretos", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return res.json({ user, token });
  }
}

module.exports = SessionsController;
