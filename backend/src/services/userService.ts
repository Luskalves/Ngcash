import * as jwt from 'jsonwebtoken';
import BadRequest from '../errors/BadRequest';
import IUser from '../interfaces/IUser';
import UserModel from '../models/userModel';

class UserService {
  private Model: UserModel;
  constructor(model: UserModel) {
    this.Model = model;
  }

  public async userInfo(token: string) {
    const data = jwt.decode(token);

    if(!data) throw new BadRequest("Token inválido!");

    const { username } = data as IUser;

    const userData = await this.Model.userInfo(username);

    return userData;
  }
}

export default UserService;