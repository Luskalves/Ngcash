'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        password: '25e4ee4e9229397b6b17776bfceaf8e7', // adminpass
        accountId: 1
      },
      {
        username: 'lucas',
        password: 'e7d80ffeefa212b7c5c55700e4f7193e', // senha123
        accountId: 2
      },
      {
        username: 'user',
        password: '25d55ad283aa400af464c76d713c07ad', // 12345678
        accountId: 3
      }
    ])
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
