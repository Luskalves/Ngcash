import * as chai from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import RegisterModel from '../../../models/regirterModel';
import RegisterService from '../../../services/registerService';
import RegisterController from '../../../controllers/registerController';
import { tokenMock, tokenResponse } from '../../mocks/userMocks';

const model = new RegisterModel();
const service = new RegisterService(model);
const controller = new RegisterController(service);

const req = { body: '' as any } as Request;
const res = {} as Response;

const { expect } = chai;

describe("Testes do controller de register", () => {
  beforeEach(() => {
    sinon.restore();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it("Testando se é retornado um token após uma requisição para se registrar", async () => {
    sinon.stub(service, "register").resolves(tokenMock);

    await controller.post(req, res);

    const statusStub = res.status as sinon.SinonStub;
    const jsonStub = res.json as sinon.SinonStub;

    expect(statusStub.calledWith(201)).to.be.true;
    expect(jsonStub.calledWith(tokenResponse));
  });
});