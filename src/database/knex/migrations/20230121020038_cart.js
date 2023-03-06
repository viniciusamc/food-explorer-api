exports.up = (knex) =>
  knex.schema.createTable("cart", (table) => {
    table.increments("id");
    table.integer("user_id").references("id").inTable("users");
    table.integer("meal_id").references("id").inTable("meals");
  });

exports.down = (knex) => knex.schema.dropTable("cart");
