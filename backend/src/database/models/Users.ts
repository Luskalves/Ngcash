import database from '.'
import Accounts from './Accounts';
import { Model, INTEGER, STRING } from 'sequelize';

class Users extends Model {
  id?: number;
  username?: string;
  password?: string;
  accountId?: number;
}

Users.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  username: {
    type: STRING,
    allowNull: false
  },

  password: {
    type: STRING,
    allowNull: false
  },

  accountId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'Accounts',
      key: 'id',
    }
  }
}, {
  timestamps: false,
  sequelize: database,
});

Users.belongsTo(Accounts, {
  foreignKey: 'id'
})

export default Users;

