const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite")
const { compare } = require("bcrypt")
const authConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")

class SessionsController
{
  async create(req,res)
  {
    const database = await sqliteConnection();

    const { email,password,admin } = req.body;

    const user = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(!user)
    {
      throw new AppError("Email e/ou senha incorretos", 401)
    }

    const passwordMatch = await compare(password, user.password)

    if(!password)
    {
      throw new AppError("Email e/ou senha incorretos", 401)
    }

    const { secret, expiresIn} = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    });
    
    return res.json({user,token});
  }
}

module.exports = SessionsController;
