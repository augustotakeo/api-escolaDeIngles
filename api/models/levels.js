'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Levels extends Model {
    static associate(models) {
      models.Levels.hasMany(models.Classes, {
        foreignKey: "level_id"
      });
    }
  };
  Levels.init({
    level_description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Levels',
    paranoid: true
  });
  return Levels;
};