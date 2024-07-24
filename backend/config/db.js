const { Sequelize, DataTypes } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('statistics', 'root', 'password', {
    host: "127.0.0.1",
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

