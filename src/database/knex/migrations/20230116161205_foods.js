exports.up = (knex) =>
  knex.schema.createTable("meals", (table) => {
    table.increments("id");
    table.text("name");
    table.text("desc");
    table.text("price");
    table.text("category");
    table.text("picture");
    table.text("ingredients");
  });

exports.down = (knex) => knex.schema.dropTable("meals");
