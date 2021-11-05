'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("People", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("People", "deletedAt", {});
  }
};
