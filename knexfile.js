const path = require("path");

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      connectionString: `${process.env.DB_CONNECT}`,
      ssl: true,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ),
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "knex", "seeds"),
    },
    useNullAsDefault: true,
  },
};
