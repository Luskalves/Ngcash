import * as jwt from 'jsonwebtoken';
import BadRequest from '../errors/BadRequest';
import IUser from '../interfaces/IUser';
import IUserInfo from '../interfaces/IUserInfo';
import UserModel from '../models/userModel';

class UserService {
  private Model: UserModel;
  constructor(model: UserModel) {
    this.Model = model;
  }

  public async userInfo(token: string): Promise<IUserInfo> {
    const data = jwt.decode(token);

    if(!data) throw new BadRequest("Token inválido!");

    const { username } = data as IUser;

    const userData = await this.Model.userInfo(username);

    return userData;
  }

  public async userDeposit(token: string, value: number): Promise<void> {
    if (value <= 0 ) throw new BadRequest("Valor de deposito inválido.");

    const { accountId } = await this.userInfo(token);

    await this.Model.userDeposit(accountId, value);
  }
}

export default UserService;