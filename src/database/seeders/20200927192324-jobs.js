const data = require('../seeders-data/jobs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('jobs', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    return
  }
};
