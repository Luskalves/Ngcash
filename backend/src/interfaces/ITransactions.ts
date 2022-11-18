export default interface ITransactions {
  debitedAccountId: number,
  creditedAccountId: number,
  value: number,
  createdAt: Date
}