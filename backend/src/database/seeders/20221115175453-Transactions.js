'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Transactions', [
      {
        debitedAccountId: 1,
        creditedAccountId: 2,
        value: 50,
        date: "2022-11-15T17:57:26.220Z"
      },
      {
        debitedAccountId: 3,
        creditedAccountId: 1,
        value: 20,
        date: "2021-10-28T17:57:26.220Z"
      },
      {
        debitedAccountId: 2,
        creditedAccountId: 3,
        value: 75,
        date: "2018-06-04T18:02:32.220Z"
      },
    ])
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Transactions', null, {});
  }
};
