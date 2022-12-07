module.exports = function(sequelize, dataTypes){

    const alias = "Province";
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
    }
    const config = {
        tableName: "provinces",
        underscored: true,
    }

    const Province = sequelize.define(alias, cols, config)

    Province.associate = (models)=>{
        Province.hasMany(models.User, {
            as: "users",
            foreignKey: "province_id"
        })
    };

    return Province;
}