import * as chai from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import LoginModel from '../../../models/loginModel';
import LoginService from '../../../services/loginService';
import LoginController from '../../../controllers/loginController';
import { tokenMock, tokenResponse } from '../../mocks/userMocks';

const model = new LoginModel();
const service = new LoginService(model);
const controller = new LoginController(service);

const req = { body: '' as any } as Request;
const res = {} as Response;

const { expect } = chai;

describe("Testes do controller de login", () => {
  beforeEach(() => {
    sinon.restore();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it("Testando se ao fazer um requisição válida um token é retornado", async () => {
    sinon.stub(service, "findUser").resolves(tokenMock);

    await controller.post(req, res);

    const statusStub = res.status as sinon.SinonStub;
    const jsonStub = res.json as sinon.SinonStub;

    expect(statusStub.calledWith(201)).to.be.true;
    expect(jsonStub.calledWith(tokenResponse));
  });
});