const Transaction = require("../models/transactions")
const TransactionJson = require('../Transactions.json')
const userManager = require("./userManager")
const mongoose = require('mongoose')


class transactionManager {
    static async getCategory(categoryName, month, user) {
        if (Number(month) > 0) {
            const transactions = await Transaction.aggregate([
                {
                    $match: { $and: [{ category: categoryName }, { user: user }] }
                },
                { $addFields: { "month": { $month: '$date' } } },
                { $match: { month: Number(month) } }
            ])
            return transactions
        }
        else {
            const transactions = await Transaction.find({ $and: [{ category: categoryName }, { user: user }] })
            return transactions
        }

    }
    static async getTransactions(user) {
        const transactions = await Transaction.find({ user: user })
        return transactions
    }
    static async deleteTransaction(transactionId) {
        const deletedTransaction = await Transaction.findByIdAndDelete(transactionId)
        const balance = await userManager.changeBalance(deletedTransaction.user, -1*deletedTransaction.amount)
        if (deletedTransaction) {
            return { success: true, message: "Transaction removed successfully", balance }
        }
        else {
            return { success: false, message: "Transaction not found" }
        }
    }
    static async addTransaction(transaction) {
        const newTransaction = new Transaction(transaction)
        await newTransaction.save()
        const balance = await userManager.changeBalance(transaction.user, transaction.amount)
        return {...newTransaction, balance}
    }
    static async findSumCategory(targetMonth, userID) {
        const userObjectId = new mongoose.Types.ObjectId(userID);
        if (targetMonth !== "0") {
            return Transaction.aggregate([
                {
                    $addFields: {
                        month: { $month: "$date" },
                    }
                },
                {
                    $match: {
                        $and: [
                            { user: userObjectId },
                            { month: Number(targetMonth) }
                        ]
                    }
                },
                {
                    $group: {
                        _id: "$category",
                        totalSum: { $sum: "$amount" }
                    }
                }]);
        }
        else {
            return Transaction.aggregate([{
                $match: {
                    user: userObjectId
                }
            },
            {
                $group: {
                    _id: "$category",
                    totalSum: { $sum: "$amount" }
                }
            }])
        }
    }
    static async regenerate() {
        const today = new Date().toISOString().split('T')[0];
        await Transaction.deleteMany({})
        await userManager.restartUser("65c6926f0ba4fac58de1a4e1")
        for (const t of TransactionJson) {

            await transactionManager.addTransaction({ ...t, date: today, user:"65c6926f0ba4fac58de1a4e1" })
        }
        return { success: true, message: "Transactions were regenerated" }
    }
}

module.exports = transactionManager