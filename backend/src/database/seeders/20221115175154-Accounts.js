'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Accounts', [
      {
        balance: 100,
      },
      {
        balance: 100,
      },
      {
        balance: 100,
      }
    ])
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Accounts', null, {});
  }
};
