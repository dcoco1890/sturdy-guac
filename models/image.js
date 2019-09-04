module.exports = function(sequelize, DataTypes) {
    var Image = sequelize.define("Image", {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.BIGINT(11)
        },
        data: {
            type: DataTypes.BLOB("long"),
            allowNull: false
        },
        lat: {
            type: DataTypes.DECIMAL(16, 14),
            allowNull: false
        },
        long: {
            type: DataTypes.DECIMAL(16, 14),
            allowNull: false
        },
        name: DataTypes.STRING

    }, {
        timestamps: false,
    });
    return Image;
};