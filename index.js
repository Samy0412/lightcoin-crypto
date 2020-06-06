// let balance = 500.0;

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
    // Have the account balance start at $0 since that makes more sense.
    // this.balance = 0;
  }
  get balance() {
    let balance = 0;
    for (let transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}
class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    } else {
      return false;
    }
  }
}
class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return this.account.balance - this.amount >= 0;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");
console.log("Starting Balance:", myAccount.balance);

const t1 = new Deposit(120.0, myAccount);
t1.commit();

console.log(t1);
const t2 = new Withdrawal(50.0, myAccount);
t2.commit();
//console.log(myAccount.balance);
const t3 = new Withdrawal(80.0, myAccount);
t3.commit();
console.log(t3);
//console.log(myAccount.balance);
console.log("Ending Balance:", myAccount.balance);
console.log(myAccount.transactions);
