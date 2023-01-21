const sqliteConnection = require("../../sqlite");
const createUsers = require("./creteUsers");

async function migrationsRun(){
  const schemas = [
    createUsers
  ].join('');

  sqliteConnection().then(db => db.exec(schemas)).catch(e => console.error(e))
}

module.exports = migrationsRun;
