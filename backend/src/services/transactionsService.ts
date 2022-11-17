import * as jwt from 'jsonwebtoken';
import ConflictError from '../errors/ConflictError';
import IUser from "../interfaces/IUser";
import TransactionsModel from "../models/transactionsModel";
import UserModel from '../models/userModel';

const SAME_USER = "O usuário não pode fazer uma transferência para si mesmo.";

class TransactionsService {
  private Model: TransactionsModel;
  private SecondaryModel: UserModel; 
  constructor(model: TransactionsModel, secondaryModel: UserModel) {
    this.Model = model;
    this.SecondaryModel = secondaryModel;
  }
  
  public async cashOut(
    token: string,
    value: number,
    userDest: string) {
    const data = jwt.decode(token);
    const { username } = data as IUser;

    const user = await this.SecondaryModel.userInfo(username);
    const destUser = await this.SecondaryModel.userInfo(userDest);

    if (user.accountId === destUser.accountId) throw new ConflictError(SAME_USER)

    if (value > user.balance) throw new ConflictError("Saldo insuficiente");

    const response = await this.Model
      .transaction(user.accountId, destUser.accountId, value);
  
    return response;
  }
}

export default TransactionsService;