import { Router } from 'express';
import { Request, Response } from 'express';
import RegisterModel from '../models/regirterModel';
import RegisterService from '../services/RegisterService';
import RegisterController from '../controllers/RegisterController';

const registerRoute = Router();

const model = new RegisterModel();
const service = new RegisterService(model);
const controller = new RegisterController(service);

registerRoute.post('/', (req: Request, res: Response) => controller.post(req, res))

export default registerRoute;