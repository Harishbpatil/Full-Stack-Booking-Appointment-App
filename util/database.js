const Sequelize = require("sequelize");

const sequelize = new Sequelize("users", "root", "pass123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
