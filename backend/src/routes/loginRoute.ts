import { Router, Request, Response } from 'express';
import LoginModel from '../models/loginModel';
import LoginService from '../services/loginService';
import LoginController from '../controllers/loginController';

const loginRoute = Router();

const model = new LoginModel();
const service = new LoginService(model);
const controller = new LoginController(service);


loginRoute.post('/', (req: Request, res: Response) => controller.post(req, res))

export default loginRoute;