

function processBankAccount(account) {

  const data = JSON.parse(JSON.stringify(account));

  let initialBalance = Number(data.initialBalance);
  if (isNaN(initialBalance)) {
    initialBalance = 0; 
  }

  let balance = initialBalance;

  let applied = [];
  let rejected = [];
  let auditLog = "";

  try {
    
    for (let txn of data.transactions) {

      try {
      
        if (!txn || typeof txn !== "object") {
          rejected.push({ txn, reason: "Invalid transaction format" });
          continue;
        }

       
        if (!txn.type) {
          rejected.push({ ...txn, reason: "Missing transaction type" });
          continue;
        }

        const type = txn.type.toLowerCase();

        if (type !== "deposit" && type !== "withdraw") {
          rejected.push({ ...txn, reason: "Unknown transaction type" });
          continue;
        }

        
        let amount = Number(txn.amount);

        if (isNaN(amount)) {
          rejected.push({ ...txn, reason: "Invalid amount" });
          continue;
        }

        if (amount <= 0) {
          rejected.push({ ...txn, reason: "Amount must be greater than zero" });
          continue;
        }

        
        if (type === "deposit") {
          balance += amount;
          applied.push({ ...txn, status: "Done" });
        }

        if (type === "withdraw") {
          if (amount > balance) {
            rejected.push({ ...txn, reason: "Not enough balance" });
          } else {
            balance -= amount;
            applied.push({ ...txn, status: "Done" });
          }
        }

      } catch (err) {
       
        rejected.push({ ...txn, reason: "System Error" });
      }

    }

  } catch (err) {
    console.log("Main processing error:", err.message);
  }

  finally {
    auditLog = "Processing done at: " + new Date().toLocaleString();
    console.log(auditLog);
  }

  return {
    accountNumber: data.accountNumber,
    accountHolder: data.accountHolder,
    currency: data.currency,
    initialBalance,
    finalBalance: balance,
    appliedTransactions: applied,
    rejectedTransactions: rejected,
    auditLog
  };
}

const input = {
  accountNumber: "12345",
  accountHolder: "John Doe",
  currency: "INR",
  initialBalance: "5000",
  transactions: [
    { type: "Deposit", amount: "1000" },
    { type: "Withdraw", amount: "2000" },
    { type: "Withdraw", amount: "9000" },
    { type: "Deposit", amount: "-200" },  
    { type: "Transfer", amount: 500 },   
    { type: "Withdraw", amount: "abc" },  
    { amount: 300 },                     
    null                                  
  ]
};

console.log("FINAL RESULT:");
console.log(processBankAccount(input));