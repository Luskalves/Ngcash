import { Model, INTEGER, DATE } from 'sequelize';
import database from '.';

class Transactions extends Model {
  id?: number;
  debitedAccountId?: number;
  creditedAccountId?: number;
  value?: number;
  createdAt?: Date; 
}

Transactions.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  
  debitedAccountId: {
    type: INTEGER,
    allowNull: false,
  },

  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
  },

  value: {
    type: INTEGER,
    allowNull: false,
  },

  createdAt: {
    type: DATE,
    allowNull: false,
  }
}, {
  sequelize: database,
  timestamps: false,
});

export default Transactions;