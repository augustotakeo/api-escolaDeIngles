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
    status: {
      type: DataTypes.STRING,
      validate: {
        isValid(data) {
          if( data != "confirmado" & data != "cancelado" ) {
            throw new Error("status só pode ser cancelado ou confirmado")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Registrations',
    paranoid: true
  });
  return Registrations;
};