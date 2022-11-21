import ITransactions from "../../interfaces/ITransactions";

const newDate = new Date;
const oldDate1 = new Date("2020-02-15");
const oldDate2 = new Date("2017-05-13");

const newTransacion = {
  debitedAccountId: 1,
  creditedAccountId: 2,
  value: 100,
  createdAt: newDate,
}

const allTransactions: ITransactions[] = [
  {
    debitedAccountId: 1,
    creditedAccountId: 2,
    value: 100,
    createdAt: newDate,
  },
  {
    debitedAccountId: 2,
    creditedAccountId: 1,
    value: 100,
    createdAt: newDate,
  },
]

const credTransactions = [
  {
    debitedAccountId: 2,
    creditedAccountId: 1,
    value: 80,
    createdAt: oldDate1,
  },
  {
    debitedAccountId: 2,
    creditedAccountId: 1,
    value: 50,
    createdAt: oldDate1,
  },
]

const debTransactions = [
  {
    debitedAccountId: 1,
    creditedAccountId: 2,
    value: 100,
    createdAt: oldDate2,
  },
  {
    debitedAccountId: 1,
    creditedAccountId: 2,
    value: 80,
    createdAt: oldDate2,
  },
]


const transactionsByDate = [
  {
    debitedAccountId: 1,
    creditedAccountId: 2,
    value: 100,
    createdAt: oldDate1,
  },
  {
    debitedAccountId: 1,
    creditedAccountId: 3,
    value: 80,
    createdAt: oldDate1,
  },
  {
    debitedAccountId: 5,
    creditedAccountId: 1,
    value: 80,
    createdAt: oldDate1,
  },
  {
    debitedAccountId: 2,
    creditedAccountId: 1,
    value: 50,
    createdAt: oldDate1,
  },
]


export { 
  newTransacion,
  allTransactions,
  credTransactions,
  debTransactions,
  transactionsByDate
};