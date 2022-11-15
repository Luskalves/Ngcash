import { Model, INTEGER } from 'sequelize';
import database from '.';
import Users from './Users';


class Accounts extends Model {
  id?: number;
  balance?: number;
}

Accounts.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  balance: {
    type: INTEGER,
    allowNull: false,
  }
}, {
  sequelize: database,
  timestamps: false,
});

export default Accounts;
