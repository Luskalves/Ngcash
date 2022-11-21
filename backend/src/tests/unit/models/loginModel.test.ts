import { expect } from 'chai';
import * as sinon from 'sinon';
import { validUser } from '../../mocks/userMocks';
import LoginModel from '../../../models/loginModel';
import Users from '../../../database/models/Users';
import NotFound from '../../../errors/NotFound';

const model = new LoginModel();

describe("Testes do model de login", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("Verifica se encontra um usuário e retorna true", async () => {
    sinon.stub(Users, "findOne").resolves({ id: 1 } as any);

    const response = await model.findOne(validUser);

    expect(response).to.be.equal(true);
  })

  it("verifica se um erro é disparado ao não encontrar o usuário", async () => {
    sinon.stub(Users, "findOne").resolves({} as any);
    let response;

    try {
      await model.findOne(validUser);
    } catch (error) {
      response = error;
    }

    expect(response).to.be.instanceOf(NotFound);
  });
});