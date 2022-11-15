'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      debitedAccountId: {
        allowNull: false,
        references: {
          model: 'Accounts',
          key: 'id'
        },
      },

      creditedAccountId: {
        allowNull: false,
        references: {
          model: 'Accounts',
          key: 'id'
        },
      },

      value: {
        allowNull: false,
        type: Sequelize.INTEGER
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    },{
      timestamps: false,
    })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};
