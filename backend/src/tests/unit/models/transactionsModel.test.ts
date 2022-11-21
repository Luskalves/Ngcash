import { expect } from 'chai';
import * as sinon from 'sinon';
import Accounts from '../../../database/models/Accounts';
import Transactions from '../../../database/models/Transactions';
import TransactionsModel from '../../../models/transactionsModel';
import { allTransactions, credTransactions, debTransactions, newTransacion, transactionsByDate } from '../../mocks/transactionsMocks';

const model = new TransactionsModel();

describe("Testes do model de transactions", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("Testa se uma nova transação é criada", async() => {
    sinon.stub(Accounts, "update").resolves();
    sinon.stub(Transactions, "create").resolves(newTransacion as any);

    const response = await model.transaction(1, 2, 100);

    expect(response).to.be.deep.equal(newTransacion);
  });

  it("Testa se retorna todas as transações", async () => {
    sinon.stub(Transactions, "findAll").resolves(allTransactions as any);

    const response = await model.getAll(1);

    expect(response).to.be.deep.equal(allTransactions);
  });

  it("Testa se retorna as transações por data sem filtro", async () => {
    sinon.stub(Transactions, "findAll").resolves(transactionsByDate as any);

    const response = await model.getFiltered(1, new Date("2020-02-15"), "");

    expect(response).to.be.deep.equal(transactionsByDate);
  });

  it("Testa se retorna as transações por data com filtro por conta debitada", async () => {
    sinon.stub(Transactions, "findAll").resolves(debTransactions as any);

    const response = await model.getFiltered(1, new Date("2020-02-15"), "debitedAccountId");

    expect(response).to.be.deep.equal(debTransactions);
  });

  it("Testa se retorna as transações por data com filtro por conta creditada", async () => {
    sinon.stub(Transactions, "findAll").resolves(credTransactions as any);

    const response = await model.getFiltered(1, new Date("2020-02-15"), "creditedAccountId");

    expect(response).to.be.deep.equal(credTransactions);
  });
});