require('dotenv').config();

const Sequelize = require('sequelize');
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  firstName: Sequelize.STRING,
});

sequelize
  .query('DROP DATABASE IF EXISTS greenfield')
  .then(() => sequelize.query('CREATE DATABASE greenfield'))
  .then(() => sequelize.query('USE greenfield'))
  .then(() => {
    const User = sequelize.define('User', {
      firstName: Sequelize.STRING,
    });

    User.sync({ force: true })
      .then(() => {
        return [User];
      })
      .catch((err) => console.error(err));
  });

module.exports = {
  User,
};
