const util = require("util");

const exec = util.promisify(require("child_process").exec);

async function migrateDatabaseTables(connString) {
  var { stdout, stderr } = await exec(
    `npx sequelize-cli db:migrate --url ${connString}`
  );
  if (stderr) throw "Migration failed: " + stderr;
  console.log(stdout);
}

async function migrateDataSeeders(connString) {
  var { stdout, stderr } = await exec(
    `npx sequelize-cli db:seed:all --url ${connString}`
  );
  if (stderr) console.error("Seed failed: " + stderr);
  else console.log(stdout);
}

module.exports = async (connString) => {
  // apply database migration
  await migrateDatabaseTables(connString);

  // apply seeders
  await migrateDataSeeders(connString);
};
