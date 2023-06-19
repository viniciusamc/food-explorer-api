const bcrypt = require("bcrypt");
require("dotenv/config");

const PASSWORD_HASH = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 12);
console.log(process.env.ADMIN_PASSWORD);

exports.seed = async function (knex) {
  await knex("users").insert([
    {
      id: 1,
      name: "admin",
      email: "admin@admin.com",
      password: PASSWORD_HASH,
      role: "admin",
    },
  ]);
};
