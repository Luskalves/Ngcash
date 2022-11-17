import md5 from 'md5';
import 'dotenv/config';
import * as jwt from "jsonwebtoken";
import IUser from "../interfaces/IUser";
import BadRequest from '../errors/BadRequest';
import RegisterModel from "../models/regirterModel";
import userSchema from '../helpers/validateUserSchema';

const { JWT_SECRET } = process.env;

class RegisterService {
  private Model: RegisterModel;
  
  constructor(model: RegisterModel) {
    this.Model = model;
  }

  public async register(user: IUser) {
    const parsed = userSchema.safeParse(user)
    if (!parsed.success) throw new BadRequest("Dados Inválidos");

    await this.Model.existUser(user.username);
    user.password = md5(user.password)
    await this.Model.register(user);

    const payload = {
      username: user.username,
    }

    const token = jwt.sign(payload, String(JWT_SECRET), { expiresIn: "24" });
    return token;
  }
}

export default RegisterService;