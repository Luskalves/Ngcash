import { Sequelize } from 'sequelize';
import NotFound from '../errors/NotFound';
import Users from '../database/models/Users';
import IUserInfo from '../interfaces/IUserInfo';
import Accounts from '../database/models/Accounts';

class UserModel {
  public async userInfo(nameUser: string): Promise<IUserInfo> {
    const user = await Users.findOne({
      where: { username: nameUser }, 
      attributes: { exclude: ['password'] }
    });

    if (!user) throw new NotFound(`Informações de ${nameUser} não encontradas!`);

    const userBalance = await Accounts.findOne({
      where: { id: user.id },
      attributes: { exclude: ['id'] }
    });

    if (!userBalance) throw new NotFound("Saldo não encontrado!");
    const { id, username, accountId } = user;

    return { id, username, accountId, balance: userBalance.balance } as IUserInfo;
  }

  public async userDeposit(accountId: number, value: number): Promise<void> {
    await Accounts.update({
      balance: Sequelize.literal(`balance + ${value}`)
    }, {
      where: { id: accountId },
    });
  }
}

export default UserModel;