const sequelize = require("sequelize");

const { database, username, password, host, dialect } = require("./env");

const db = new sequelize(database, username, password, {
  host,
  dialect,
  logging: false
});

module.exports = db;
