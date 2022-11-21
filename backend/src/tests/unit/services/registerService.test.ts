import 'dotenv/config';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import RegisterModel from '../../../models/regirterModel';
import RegisterService from '../../../services/registerService';
import { validUser } from '../../mocks/userMocks';

const { JWT_SECRET } = process.env;

const model = new RegisterModel()
const service = new RegisterService(model);

describe("Testes do Service de register", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("Testa se ao registrar um novo usuário um token é retornado", async () => {
    sinon.stub(model, "existUser").resolves();
    sinon.stub(model, "register").resolves(validUser as any);
    const payload = {
      username: validUser.username,
    }

    const token = jwt.sign(payload, String(JWT_SECRET), { expiresIn: "24" });
    const response = await service.register(validUser);

    expect(response).to.be.equal(token);
  });
});