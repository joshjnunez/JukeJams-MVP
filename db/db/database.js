require('dotenv').config();

const Sequelize = require('sequelize');

const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
});

// let sequelize;
// try {
// console.log(process.env);
// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
//   host: '130.211.115.84',
//   port: '3306',
//   dialect: 'mysql',
//   // dialectOptions: {
//   // socketPath: `/cloudsql/${DB_INSTANCE}`,
//   // },
// });
// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
//   host: `/cloudsql/${process.env.DB_INSTANCE}`,
//   dialect: 'mysql',
//   dialectOptions: {
//     socketPath: `/cloudsql/${DB_INSTANCE}`,
//   },
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.info('INFO - Database connected.');
//   })
//   .catch((err) => {
//     console.error('ERROR - Unable to connect to the database:', err);
//   });
// console.log(sequelize, 'connected');
// return sequelize;
// } catch (err) {
//   console.error(err, sequelize, 'error db');
// }

// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
//   host: `/cloudsql/${process.env.DB_INSTANCE}`,
//   dialect: 'mysql',
//   dialectOptions: {
//     socketPath: `/cloudsql/${DB_INSTANCE}`,
//   },
// });

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
