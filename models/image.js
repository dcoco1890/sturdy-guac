module.exports = function(sequelize, DataTypes) {
    var Image = sequelize.define("Image", {
        // type: {
        //     type: DataTypes.STRING
        // },
        // name: {
        //     type: DataTypes.STRING
        // },
        data: {
            type: DataTypes.BLOB("long")
        }
    }, {
        timestamps: false,
    });
    return Image;
};