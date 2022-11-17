import { Sequelize } from 'sequelize';
import Accounts from '../database/models/Accounts';
import Transactions from '../database/models/Transactions';

class TransactionsModel {
  public async transaction(credtId: number, debtId: number, value: number) {
    await Accounts.update({
      balance: Sequelize.literal(`balance - ${value}`)
    }, {
      where: {
        id: credtId,
      },
    });
    
    await Accounts.update({
      balance: Sequelize.literal(`balance + ${value}`)
    }, {
      where: {
        id: debtId,
      },
    });

    const transDate = new Date();

    const transaction = await Transactions.create({
      debitedAccountId: debtId,
      creditedAccountId: credtId,
      value,
      createdAt: transDate,
    });

    return transaction;
  }
}

export default TransactionsModel;