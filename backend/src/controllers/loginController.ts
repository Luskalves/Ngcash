import { Request, Response } from 'express';
import LoginService from '../services/loginService';

class LoginController {
  private Service: LoginService;
  constructor(service: LoginService) {
    this.Service = service;
  }

  public async post(req: Request, res: Response) {
    const user = req.body;

    const token = await this.Service.findUser(user);

    res.status(201).json({ token });
  }
}

export default LoginController;