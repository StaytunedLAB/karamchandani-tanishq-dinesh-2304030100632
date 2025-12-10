const accountData = {
    accountNumber: "ACC123",
    holderName: "John Doe",
    initialBalance: "2000",
    currency: "INR",
    transactions: [
        { type: "Deposit", amount: 500 },
        { type: "Withdraw", amount: "300" },
        { type: "Withdraw", amount: "5000" },
        { type: "", amount: 200 },
        { type: "Deposit", amount: "-100" },
        { type: "Transfer", amount: 100 },
        { type: "Deposit", amount: "abc" },
        {},
        null
    ]
};

function processAccount(data) {
    const acc = JSON.parse(JSON.stringify(data));

    let applied = [];
    let rejected = [];
    let finalBalance = 0;

    function toNumber(v) {
        const n = Number(v);
        if (isNaN(n)) throw new Error("Invalid amount");
        return n;
    }

    try {
        const opening = toNumber(acc.initialBalance);
        if (opening < 0) throw new Error("Invalid initial balance");
        finalBalance = opening;

        for (let t of acc.transactions) {
            try {
                if (!t || typeof t !== "object") throw new Error("System Error: Broken transaction");
                if (!t.type) throw new Error("Missing transaction type");

                let type = t.type.toLowerCase();
                if (type !== "deposit" && type !== "withdraw")
                    throw new Error("Unknown transaction type");

                if (t.amount === undefined) throw new Error("Missing amount");

                let amt = toNumber(t.amount);
                if (amt <= 0) throw new Error("Amount must be positive");

                if (type === "withdraw" && amt > finalBalance)
                    throw new Error("Insufficient balance");

                if (type === "deposit") {
                    finalBalance += amt;
                    applied.push({ type: "Deposit", amount: amt });
                } else {
                    finalBalance -= amt;
                    applied.push({ type: "Withdraw", amount: amt });
                }

            } catch (err) {
                rejected.push({ transaction: t, reason: err.message });
            }
        }

    } catch (err) {
        rejected.push({ transaction: null, reason: "System Error: " + err.message });
    }

    finally {
        console.log("====================================");
        console.log("         ACCOUNT SUMMARY");
        console.log("====================================");

        console.log("Account Number:", acc.accountNumber);
        console.log("Account Holder:", acc.holderName);
        console.log("Currency:", acc.currency);
        console.log("Opening Balance:", acc.initialBalance);
        console.log("Final Balance:", finalBalance);

        console.log("\n--- Applied Transactions ---");
        console.log(applied);

        console.log("\n--- Rejected Transactions ---");
        console.log(rejected);

        console.log("\n[AUDIT LOG] Processing completed\n");
    }
}

processAccount(accountData);