'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registrations extends Model {
    static associate(models) {
      models.Registrations.belongsTo(models.Classes, {
        foreignKey: "class_id"
      });
      models.Registrations.belongsTo(models.People, {
        foreignKey: "student_id"
      });
    }
  };
  Registrations.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Registrations',
  });
  return Registrations;
};