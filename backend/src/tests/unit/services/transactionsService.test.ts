import { expect } from 'chai';
import * as sinon from 'sinon';
import UserModel from '../../../models/userModel';
import TransactionsModel from '../../../models/transactionsModel';
import TransactionsService from '../../../services/transactionsService';
import { allTransactions, credTransactions, debTransactions, newTransacion, transactionsByDate } from '../../mocks/transactionsMocks';
import { userInfoMock, userInfoMock2 } from '../../mocks/userMocks';

const model = new TransactionsModel();
const secondaryModel = new UserModel();
const service = new TransactionsService(model, secondaryModel);

describe("Testes do Service de transactions", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("Testa se é ao fazer uma requisição de cashOut ao model uma nova transação é feita", async () => {
    sinon.stub(service, "getUser").resolves(userInfoMock);
    sinon.stub(secondaryModel, "userInfo").resolves(userInfoMock2 as any);
    sinon.stub(model, "transaction").resolves(newTransacion as any);

    const response = await service.cashOut("token", 50, "userDest");

    expect(response).to.be.deep.equal(newTransacion);
  });

  it("Testa se retorna todas as transações", async () => {
    sinon.stub(service, "getUser").resolves(userInfoMock);
    sinon.stub(model, "getAll").resolves(allTransactions as any);

    const response = await service.getTransactions("token");

    expect(response).to.be.deep.equal(allTransactions);
  });

  it("Testa se retorna as transações por data sem filtros", async () => {
    sinon.stub(service, "getUser").resolves(userInfoMock);
    sinon.stub(model, "getFiltered").resolves(transactionsByDate);

    const date = new Date();

    const response = await service.getFiltered("token", date,"");

    expect(response).to.be.deep.equal(transactionsByDate);
  });

  it("Testa se retorna as transações por filtro de credito", async () => {
    sinon.stub(service, "getUser").resolves(userInfoMock);
    sinon.stub(model, "getFiltered").resolves(credTransactions);

    const date = new Date();

    const response = await service.getFiltered("token", date, "creditedAccountId");

    expect(response).to.be.deep.equal(credTransactions);
  });

  it("Testa se retorna as transações por filtro de debito", async () => {
    sinon.stub(service, "getUser").resolves(userInfoMock);
    sinon.stub(model, "getFiltered").resolves(debTransactions);

    const date = new Date();

    const response = await service.getFiltered("token", date, "debitedAccountId");

    expect(response).to.be.deep.equal(debTransactions);
  });
});