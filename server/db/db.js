var Sequelize = require('sequelize');
var username = process.env.SQL_USERNAME;
var password = process.env.SQL_PASSWORD;
var dbURL = process.env.CLEARDB_DATABASE_URL;

var db = new Sequelize(dbURL, username, password, {
  define: {timestamps: false}
});

module.exports = db;
