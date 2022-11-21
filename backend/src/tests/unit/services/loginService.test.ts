import 'dotenv/config';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import LoginModel from '../../../models/loginModel';
import LoginService from '../../../services/loginService';

const { JWT_SECRET } = process.env;

import { parsedMock, validUser, validUserDB } from '../../mocks/userMocks';

const model = new LoginModel();
const service = new LoginService(model);

describe("Testes do Service de login", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("testa se o login for válido retorna um token", async () => {
    sinon.stub(model, "findOne").resolves(validUserDB as any);

    const payload = {
      username: validUserDB.username,
    };

    const token = jwt.sign(payload, String(JWT_SECRET), { expiresIn: '24h' });

    const response = await service.findUser(validUser);

    expect(response).to.be.equal(token);
  });
});