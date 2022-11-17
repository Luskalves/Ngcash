import { Router, Request, Response } from 'express';
import RegisterModel from '../models/regirterModel';
import RegisterService from '../services/registerService';
import RegisterController from '../controllers/registerController';

const registerRoute = Router();

const model = new RegisterModel();
const service = new RegisterService(model);
const controller = new RegisterController(service);

registerRoute.post('/', (req: Request, res: Response) => controller.post(req, res))

export default registerRoute;