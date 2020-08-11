"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class testcase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  testcase.init(
    {
      given: DataTypes.STRING,
      result: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "test-case",
    }
  );
  return testcase;
};
