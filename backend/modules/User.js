// User.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Add more fields as needed
    }, {
        tableName: 'users',
        timestamps: false,  
    });

    return User;
};
