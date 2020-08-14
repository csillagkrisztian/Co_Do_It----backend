"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      exercise.hasMany(models.testCase);
      exercise.belongsTo(models.user);
    }
  }
  exercise.init(
    {
      description: { type: DataTypes.STRING, allowNull: false },
      explanation: { type: DataTypes.TEXT, allowNull: false },
      isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "exercise",
    }
  );
  return exercise;
};
