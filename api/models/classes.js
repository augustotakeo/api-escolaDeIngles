'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classes extends Model {
    static associate(models) {
      models.Classes.belongsTo(models.Levels, {
        foreignKey: "level_id"
      });
      models.Classes.belongsTo(models.People, {
        foreignKey: "professor_id"
      });
    }
  };
  Classes.init({
    initial_date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Classes',
  });
  return Classes;
};