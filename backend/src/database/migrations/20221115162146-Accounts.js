'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Accounts', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      
      balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    }, {
      timestamps: false,
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('Accounts');
  }
};
