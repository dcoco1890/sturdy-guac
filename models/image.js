module.exports = function(sequelize, DataTypes) {
    var Image = sequelize.define("Image", {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.BIGINT(11)
        },
        // kind: DataTypes.STRING,
        // name: DataTypes.STRING,
        data: DataTypes.BLOB("long")

    }, {
        timestamps: false,
    });
    return Image;
};