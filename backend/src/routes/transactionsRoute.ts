import { Router, Request, Response } from 'express';
import UserModel from '../models/userModel';
import TransactionsModel from '../models/transactionsModel';
import TransactionsService from '../services/transactionsService';
import TransactionsController from '../controllers/transactionsController';

const transRoute = Router();

const model = new TransactionsModel();
const secondModel = new UserModel();
const service = new TransactionsService(model, secondModel);
const controller = new TransactionsController(service);

transRoute.get('/', (req: Request, res: Response) => controller.getAll(req, res));
transRoute.patch('/', (req: Request, res: Response) => controller.cashOut(req, res));

export default transRoute;
