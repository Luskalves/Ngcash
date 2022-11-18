'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Transactions', [
      {
        debitedAccountId: 1,
        creditedAccountId: 2,
        value: 50,
        createdAt: "2022-11-15"
      },
      {
        debitedAccountId: 3,
        creditedAccountId: 1,
        value: 20,
        createdAt: "2021-10-28"
      },
      {
        debitedAccountId: 2,
        creditedAccountId: 3,
        value: 75,
        createdAt: "2018-06-04"
      },
    ])
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Transactions', null, {});
  }
};
