import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
  private Service: UserService;
  constructor(service: UserService) {
    this.Service = service;
  }

  public async getUserInfo(req: Request, res: Response) {
    const { token } = req.body;

    const response = await this.Service.userInfo(token);

    res.status(200).json(response);
  }
  
  public async userDeposit(req: Request, res: Response) {
    const { token, value } = req.body;

    await this.Service.userDeposit(token, value);

    const message = { message: "Depositado com sucesso."};

    res.status(200).json(message);
  }
}

export default UserController;