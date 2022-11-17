import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';
import LoginModel from '../models/loginModel';
import BadRequest from '../errors/BadRequest';
import userSchema from '../helpers/validateUserSchema';
import md5 from 'md5';

const { JWT_SECRET } = process.env;

class LoginService {
  private Model: LoginModel;

  constructor(model: LoginModel) {
    this.Model = model;
  }

  public async findUser(user: IUser) {
    const parsed = userSchema.safeParse(user)
    if (!parsed.success) throw new BadRequest("Dados Inválidos");

    user.password = md5(user.password)

    const isValid = await this.Model.findOne(user);
    if(!isValid) throw new Error("Algo deu errado");

    const payload = {
      username: user.username,
    }

    const token = jwt.sign(payload, String(JWT_SECRET), { expiresIn: '24h' });
    return token;
  }
}

export default LoginService;