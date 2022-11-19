import NotFound from '../errors/NotFound';
import { Op, Sequelize } from 'sequelize';
import Accounts from '../database/models/Accounts';
import ITransactions from '../interfaces/ITransactions';
import { CashType } from '../interfaces/types/CashType';
import Transactions from '../database/models/Transactions';

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

    let dateGenerate = new Date();
    let newDate = dateGenerate.toISOString().split('T')[0];

    const transaction = await Transactions.create({
      debitedAccountId: debtId,
      creditedAccountId: credtId,
      value,
      createdAt: newDate,
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

  public async getFiltered(
    id: number,
    date: Date,
    cashOp:  CashType): Promise<ITransactions[] | undefined> {
    if (!cashOp) {
      const filteredTransac = await Transactions.findAll({
        where: {
          createdAt: date,
        },
      });
      return filteredTransac as ITransactions[];
    }

    let options;

    switch (cashOp) {
      case "debitedAccountId":
        options = { where: { createdAt: date, debitedAccountId: id } };
        break;
      case "creditedAccountId":
        options = { where: { createdAt: date, creditedAccountId: id } };
        break;
    }

    const transacById = await Transactions.findAll(options);
    return transacById as ITransactions[];
  }
}

export default TransactionsModel;