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

  private async getUser(token: string): Promise<IUserInfo> {
    if (!token) throw new BadRequest("Token inválido!");

    const data = jwt.decode(token);
    const { username } = data as IUser;
    const user = await this.Model.userInfo(username);

    return user;
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

    const { accountId } = await this.getUser(token);

    await this.Model.userDeposit(accountId, value);
  }
}

export default UserService;