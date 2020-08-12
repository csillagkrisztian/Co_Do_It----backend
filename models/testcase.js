'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class testCase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  testCase.init({
    given: DataTypes.STRING,
    result: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'testCase',
  });
  return testCase;
};