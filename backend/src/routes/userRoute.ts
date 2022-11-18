import { Router, Request, Response } from 'express';
import UserModel from '../models/userModel';
import UserService from '../services/userService';
import UserController from '../controllers/userController';

const userRoute = Router();

const model = new UserModel();
const service = new UserService(model);
const controller = new UserController(service);

userRoute.get('/', (req: Request, res: Response) => controller.getUserInfo(req, res));
userRoute.patch('/deposit', (req: Request, res: Response) => controller.userDeposit(req, res));

export default userRoute;