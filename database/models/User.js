module.exports = (sequelize, dataTypes) => {
    const alias = 'User';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        avatar: {
            type: dataTypes.STRING,
            allowNull: false
        }, 
        province_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        }
    }
    const config = {
        underscored: true,
        tableName: "users"
    }

    const User = sequelize.define(alias, cols, config)

    User.associate = (models) => {
        User.belongsTo(models.Province, {
            as: "province",
            foreignKey: "province_id"
        })
    }

    return User;

}