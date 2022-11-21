import { expect } from 'chai';
import * as sinon from 'sinon';
import Accounts from '../../../database/models/Accounts';
import Users from '../../../database/models/Users';
import BadRequest from '../../../errors/BadRequest';
import RegisterModel from '../../../models/regirterModel';
import { accountMock, newRegisteredUserUMock, registeredUserUMock, validUser } from '../../mocks/userMocks';

const model = new RegisterModel()

describe("Testes do model de register", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("Verifica se um usuário é criado com sucesso", async () => {
    sinon.stub(Accounts, "create").resolves({} as any);
    sinon.stub(Users, "create").resolves(newRegisteredUserUMock as any);

    const response = await model.register(validUser);

    expect(response).to.be.deep.equal(newRegisteredUserUMock);
  });

  it("verifica se um erro é disparado caso o banco não retorne as informações", async() => {
    sinon.stub(Accounts, "create").resolves();

    let response;

    try {
      await model.register(validUser);
    } catch (error) {
      response = error;
    }

    expect(response).to.be.instanceOf(BadRequest);
  });

  it("verifica se um erro é disparado caso o banco não retorne as informações", async() => {
    sinon.stub(Accounts, "create").resolves(accountMock as any);
    sinon.stub(Users, "create").resolves();

    let response;

    try {
      await model.register(validUser);
    } catch (error) {
      response = error;
    }

    expect(response).to.be.instanceOf(BadRequest);
  });

  it("verifica se um erro é disparado caso o usuário já exista", async () => {
    sinon.stub(Users, "findOne").resolves(registeredUserUMock as any);
    let response;

    try {
      await model.existUser("username");
    } catch (error) {
      response = error;
    }

    expect(response).to.be.instanceOf(BadRequest);
  });
});