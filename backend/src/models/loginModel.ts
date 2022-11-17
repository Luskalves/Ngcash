import Users from '../database/models/Users';
import NotFound from '../errors/NotFound';
import IUser from '../interfaces/IUser';

class LoginModel {
  public async findOne(userData: IUser) {
    const { username, password } = userData;

    const user = await Users.findOne({
      where: {
        username,
        password
      }
    })

    if (!user?.id) {
      throw new NotFound("Usuário não encontrado!")
    }

    return true;
  }
}

export default LoginModel;