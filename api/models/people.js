'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class People extends Model {
    static associate(models) {
      models.People.hasMany(models.Registrations, {
        foreignKey: "student_id"
      });
      models.People.hasMany(models.Classes, {
        foreignKey: "professor_id"
      });
    }
  };
  People.init({
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'People',
  });
  return People;
};