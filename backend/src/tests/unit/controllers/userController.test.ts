import * as chai from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import UserModel from '../../../models/userModel';
import UserService from '../../../services/userService';
import UserController from '../../../controllers/userController';
import { userInfoMock } from '../../mocks/userMocks';

const model = new UserModel();
const service = new UserService(model);
const controller = new UserController(service);

const req = { body: '' as any } as Request;
const res = {} as Response;

const { expect } = chai;

describe("Testes do controller de", () => {
  beforeEach(() => {
    sinon.restore();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it("Testando se as informações do usuario são retornadas na requisição", async () => {
    sinon.stub(service, "userInfo").resolves(userInfoMock);

    await controller.getUserInfo(req, res);

    const statusStub = res.status as sinon.SinonStub;
    const jsonStub = res.json as sinon.SinonStub;

    expect(statusStub.calledWith(200)).to.be.true;
    expect(jsonStub.calledWith(userInfoMock));
  });

  it("Testando se um deposito é realizado apos uma requisição", async () => {
    sinon.stub(service, "userDeposit").resolves();

    await controller.userDeposit(req, res);

    const message = { message: "Depositado com sucesso."};

    const statusStub = res.status as sinon.SinonStub;
    const jsonStub = res.json as sinon.SinonStub;

    expect(statusStub.calledWith(200)).to.be.true;
    expect(jsonStub.calledWith(message));
  });
});