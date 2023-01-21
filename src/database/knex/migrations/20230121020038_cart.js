exports.up = knex => knex.schema.createTable("cart", table => {
  table.increments("id");
  table.text("name");
  table.text("desc");
  table.text("price");
  table.text("picture");
  table.boolean("ingredients");
});

exports.down = knex => knex.schema.dropTable("cart");
