'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Classes', [
			{
				initial_date: "2020-02-01",
				level_id: 1,
				professor_id: 6,
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
			{
				initial_date: "2020-02-01",
				level_id: 2,
				professor_id: 5,
				createdAt: new Date(),
				updatedAt: new Date()			
			},
			{
				initial_date: "2020-02-01",
				level_id: 3,
				professor_id: 6,
				createdAt: new Date(),
				updatedAt: new Date()			
				},
			{
				initial_date: "2020-07-01",
				level_id: 3,
				professor_id: 6,
				createdAt: new Date(),
				updatedAt: new Date()			
			}
		], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Classes", null, {})
  }
};
