'use strict';


const date1 = new Date("2022-01-15");
const date2 = new Date("2017-10-28");
const date3 =new Date("2004-10-28");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Transactions', [
      {
        debitedAccountId: 1,
        creditedAccountId: 2,
        value: 50,
        createdAt: date1
      },
      {
        debitedAccountId: 3,
        creditedAccountId: 1,
        value: 20,
        createdAt: date2
      },
      {
        debitedAccountId: 1,
        creditedAccountId: 3,
        value: 75,
        createdAt: date3
      },
    ])
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Transactions', null, {});
  }
};
