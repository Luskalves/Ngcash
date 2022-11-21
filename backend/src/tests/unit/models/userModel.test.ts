import { expect } from 'chai';
import * as sinon from 'sinon';
import NotFound from '../../../errors/NotFound';
import UserModel from '../../../models/userModel';
import Users from '../../../database/models/Users';
import Accounts from '../../../database/models/Accounts';
import { accountMock, registeredUserUMock, userInfoMock } from '../../mocks/userMocks';

const model = new UserModel();

describe("Testes do model de user", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("Verifica se retorna a informações do usuário", async () => {
    sinon.stub(Users, "findOne").resolves(registeredUserUMock as any);
    sinon.stub(Accounts, "findOne").resolves(accountMock as any);

    const response = await model.userInfo("username");
    
    expect(response).to.be.deep.equal(userInfoMock);
  });

  it("Verifica se dispara um erro caso o usuário não for encontrado", async () => {
    sinon.stub(Users, "findOne").resolves();

    let err;

    try {
      await model.userInfo("username");
    } catch (error) {
      err = error;
    }
    
    expect(err).to.be.instanceOf(NotFound);
  });

  it("Verifica se dispara um erro caso a conta não for encontrada", async () => {
    sinon.stub(Users, "findOne").resolves(registeredUserUMock as any);
    sinon.stub(Accounts, "findOne").resolves();

    let err;

    try {
      await model.userInfo("username");
    } catch (error) {
      err = error;
    }
    
    expect(err).to.be.instanceOf(NotFound);
  });

  it("Verifica se um deposito é realizado", async () => {
    sinon.stub(Accounts, "update").resolves();

    async function deposit() {
      await model.userDeposit(1, 50);
    }

    expect(await deposit()).to.be.equal(undefined);
  });
});