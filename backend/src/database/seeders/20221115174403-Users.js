'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        password: 'adminpass',
        accountId: 1
      },
      {
        username: 'lucas',
        password: 'senha123',
        accountId: 2
      },
      {
        username: 'user',
        password: '12345678',
        accountId: 3
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
