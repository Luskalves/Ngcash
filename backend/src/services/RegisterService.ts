import z from 'zod';
import md5 from 'md5';
import 'dotenv/config';
import * as jwt from "jsonwebtoken";
import INewUser from "../interfaces/INewUser";
import RegisterModel from "../models/regirterModel";
import BadRequest from '../errors/BadRequest';

const { JWT_SECRET } = process.env;

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(8)
})

class RegisterService {
  private Model: RegisterModel;
  
  constructor(model: RegisterModel) {
    this.Model = model;
  }

  public async register(user: INewUser) {
    const parsed = schema.safeParse(user)

    if (!parsed.success) throw new BadRequest("Dados Inválidos");

    await this.Model.existUser(user.username);

    user.password = md5(user.password)

    await this.Model.register(user);

    const token = jwt.sign(user.username, String(JWT_SECRET));

    return token;
  }
}

export default RegisterService;