'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userExercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userExercise.init({
    user_id: DataTypes.INTEGER,
    exercise_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userExercise',
  });
  return userExercise;
};