'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Payments', 'method', {
      type: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: 'credit_card'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Payments', 'method')
  }
};
