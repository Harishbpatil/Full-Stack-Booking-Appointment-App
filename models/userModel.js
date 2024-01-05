const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Appointment = sequelize.define("appointments", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Appointment;
