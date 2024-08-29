const { Sequelize, DataTypes } = require('sequelize');

/* Create a new Sequelize instance
const sequelize = new Sequelize('statistics', 'root', 'password', {
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false
});
*/

/*
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mojatv
DB_USERNAME=root
DB_PASSWORD=root321

*/

// Create a new Sequelize instance for remote DB connection
const sequelize = new Sequelize('statistics', 'statistics', 'statistics', {
    host: "10.120.14.159",  
    dialect: "mysql",
    logging: false
});

// Create an empty db object
const db = {};

// Add Sequelize and sequelize instances to the db object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import the User model
db.user = require(__dirname + '/../modules/User.js')(sequelize, DataTypes);

// Export the db object
module.exports = db;

