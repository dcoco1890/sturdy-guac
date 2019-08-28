module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    timestamps: false,
  });
  return Example;
};

// timestamps false removes the createdat and updated at