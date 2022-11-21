import { expect } from 'chai';
import * as sinon from 'sinon';
import UserModel from '../../../models/userModel';
import UserService from '../../../services/userService';
import { tokenMock, userInfoMock } from '../../mocks/userMocks';

const model = new UserModel()
const service = new UserService(model);

describe("Testes do Service de user", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("Testa se retorna as informações do usuario", async () => {
    sinon.stub(model, "userInfo").resolves(userInfoMock);

    const response = await service.userInfo(tokenMock);

    expect(response).to.be.equal(userInfoMock);
  });

  it("testa se um deposito é feito", async () => {
    sinon.stub(service, "userInfo").resolves(userInfoMock);
    sinon.stub(model, "userDeposit").resolves();

    async function deposit() {
      await service.userDeposit(tokenMock, 100);
    }

    expect(await deposit()).to.be.equal(undefined);
  });
});