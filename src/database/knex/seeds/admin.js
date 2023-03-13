const bcrypt = require("bcrypt");

const PASSWORD_ADMIN = "123";

const PASSWORD_HASH = bcrypt.hashSync(PASSWORD_ADMIN, 8);

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex('table_name').del()
  await knex("users").insert([
    {
      id: 1,
      name: "admin",
      email: "admin@admin.com",
      password: PASSWORD_HASH,
      admin: true,
    },
  ]);
};
