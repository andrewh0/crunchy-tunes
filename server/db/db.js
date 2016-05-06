var Sequelize = require('sequelize');
var username = process.env.SQL_USERNAME;
var password = process.env.SQL_PASSWORD;
var dbName = process.env.CLEARDB_DATABASE_NAME;
var dbHost = process.env.CLEARDB_DATABASE_HOST;

var db = new Sequelize(dbName, username, password, {
  host: dbHost,
  define: {
    timestamps: false
  }
});

module.exports = db;
