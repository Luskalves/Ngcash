import { Request, Response } from 'express';
import TransactionsService from '../services/transactionsService';

class TransactionsController {
  protected Service: TransactionsService;
  constructor(service: TransactionsService) {
    this.Service = service;
  }

  public async cashOut(req: Request, res: Response) {
    const { token, value, userDest } = req.body;

    const response = await this.Service.cashOut(token,value ,userDest);

    res.status(200).json(response);
  }

  public async getAll(req: Request, res: Response) {
    const { token } = req.body;

    const transactions = await this.Service.getTransactions(token)
    
    res.status(200).json(transactions);
  }
}

export default TransactionsController;