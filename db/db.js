const { Sequelize } = require("sequelize");

const db = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: false,
    })
  : new Sequelize({
      username: "postgres",
      password: "", // coded loves you too, but don't forget to remove the pw and db name before pushing.
      database: "wonderlusters_db",
      dialect: "postgres",
      host: "localhost",
      logging: false,
    });

module.exports = db;
