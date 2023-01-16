exports.up = knex => knex.schema.createTable("foods", table => {

});

exports.down = knex => knex.schema.dropTable("foods");
