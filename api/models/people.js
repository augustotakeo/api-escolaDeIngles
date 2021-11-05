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
    name: {
      type: DataTypes.STRING,
      validate: {
        min: 3
      }
    },
    active: {
      type: DataTypes.BOOLEAN
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'People',
    paranoid: true,
    defaultScope: {
      where: { active: true }
    },
    scopes: {
      allPeople: {
        where: { }
      }
    }
  });
  return People;
};