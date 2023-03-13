const bcrypt = require("bcrypt");

const PASSWORD = "123456";

const PASSWORD_HASH = bcrypt.hashSync(PASSWORD, 12);

exports.seed = async function (knex) {
  await knex("users").insert([
    {
      id: 0,
      name: "admin",
      email: "admin@admin.com",
      password: PASSWORD_HASH,
      admin: true,
    },
  ]);
};
