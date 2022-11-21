import * as chai from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import TransactionsModel from '../../../models/transactionsModel';
import TransactionsService from '../../../services/transactionsService';
import UserModel from '../../../models/userModel';
import TransactionsController from '../../../controllers/transactionsController';
import { allTransactions, newTransacion, transactionsByDate } from '../../mocks/transactionsMocks';

const model = new TransactionsModel();
const secondaryModel = new UserModel();
const service = new TransactionsService(model, secondaryModel);
const controller = new TransactionsController(service);

const req = { body: '' as any } as Request;
const res = {} as Response;


const { expect } = chai;

describe("Testes do controller de transactions", () => {
  beforeEach(() => {
    sinon.restore();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it("Testando se é possivel fazer uma requisição para transferência de cashOut", async () => {
    sinon.stub(service, "cashOut").resolves(newTransacion as any);

    await controller.cashOut(req, res);

    const statusStub = res.status as sinon.SinonStub;
    const jsonStub = res.json as sinon.SinonStub;

    expect(statusStub.calledWith(200)).to.be.true;
    expect(jsonStub.calledWith(newTransacion));
  });

  it("Testando se é possivel fazer uma requisição para retornar todas as transações", async () => {
    sinon.stub(service, "getTransactions").resolves(allTransactions as any);

    await controller.getAll(req, res);

    const statusStub = res.status as sinon.SinonStub;
    const jsonStub = res.json as sinon.SinonStub;

    expect(statusStub.calledWith(200)).to.be.true;
    expect(jsonStub.calledWith(allTransactions));
  });

  it("Testando se é possivel fazer uma requisição para retornar todas as transações por data", async () => {
    sinon.stub(service, "getFiltered").resolves(transactionsByDate as any);

    await controller.getFiltered(req, res);

    const statusStub = res.status as sinon.SinonStub;
    const jsonStub = res.json as sinon.SinonStub;

    expect(statusStub.calledWith(200)).to.be.true;
    expect(jsonStub.calledWith(transactionsByDate));
  });
});