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
}

export default UserController;