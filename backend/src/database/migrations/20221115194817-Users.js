'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', { 
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Accounts',
          key: 'id'
        }
      }
     }, {
      timestamps: false
     });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
