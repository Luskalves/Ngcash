import Accounts from '../database/models/Accounts';
import Users from '../database/models/Users';
import BadRequest from '../errors/BadRequest';
import IUser from '../interfaces/IUser';
import IRegister from '../interfaces/models/IRegister';

class RegisterModel implements IRegister {
  public async existUser(username: string) {
    const exists = await Users.findOne({
      where: {
        username,
      }
    });
    if (exists) {
      throw new BadRequest("O usurário já existe")
    }
  }

  public async register(user: IUser) {
    const { username, password } = user;

    const account = await Accounts.create({
      balance: 100,
    });

    if (!account) throw new BadRequest("Não foi possivel criar um conta");

    const response = await Users.create({
      username,
      password,
      accountId: account.id
    });

    if (!response) throw new BadRequest("Não foi possivel criar um conta");
    
    return response;
  }
}

export default RegisterModel;