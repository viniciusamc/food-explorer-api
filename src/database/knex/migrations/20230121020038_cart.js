exports.up = knex => knex.schema.createTable("cart", table => {
  table.increments("id");
  table.integer("id_cart").references("id").inTable("users");
  table.integer("quantity");
});

exports.down = knex => knex.schema.dropTable("cart");
