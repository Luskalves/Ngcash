import { Request, Response } from 'express';
import RegisterService from "../services/registerService";

class RegisterController {
  public Service: RegisterService;
  constructor(service: RegisterService) {
    this.Service = service;
  }

  public async post(req: Request, res: Response) {
    const user = req.body;

    const token = await this.Service.register(user);

    res.status(201).json({ token })
  }
}

export default RegisterController;