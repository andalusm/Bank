const transaction = require("../models/transactions")
const TransactionJson = require('../Transactions.json')

class transactionManager{
    static async getTransactions(){
        const transactions = await transaction.find({})
        return transactions 
    }
    static async deleteTransaction(transactionId){
        const deletedTransaction = await transaction.findByIdAndDelete(transactionId)
        if (deletedTransaction) {
            return { success: true, message: "Transaction removed successfully" }
        }
        else {
            return{ success: false, error: "Transaction not found" }
        }
    }
    static async addTransaction(newTransaction){        
        const newTransactionSaved = new transaction(newTransaction)
        await newTransactionSaved.save()
        return newTransactionSaved
    }
    static async findSumCategory(){
        console.log("pppp")
        return transaction.aggregate([ { $group: {
            _id: "$category",
            totalSum: { $sum: "$amount" }
          }}])
    }
    static async regenerate(){
        await transaction.deleteMany({})
        for (const t of TransactionJson) {
            console.log(t)
            await transactionManager.addTransaction(t)
        }
        return {success: true, message: "Transactions were regenerated"}
    }
}

module.exports = transactionManager