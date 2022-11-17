import { Op, Sequelize } from 'sequelize';
import Accounts from '../database/models/Accounts';
import Transactions from '../database/models/Transactions';
import NotFound from '../errors/NotFound';

class TransactionsModel {
  public async transaction(credtId: number, debtId: number, value: number) {
    await Accounts.update({
      balance: Sequelize.literal(`balance - ${value}`)
    }, {
      where: { id: credtId },
    });
    
    await Accounts.update({
      balance: Sequelize.literal(`balance + ${value}`)
    }, {
      where: { id: debtId },
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

  public async getAll(id: number) {
    const allTransactions = await Transactions.findAll({
      where: {
        [Op.or]: [
          { debitedAccountId: id },
          { creditedAccountId: id }
        ]
      },

    });

    if (!allTransactions) throw new NotFound("Nenhuma transação encontrada.");

    return allTransactions;
  }
}

export default TransactionsModel;