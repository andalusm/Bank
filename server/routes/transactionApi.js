const express = require('express')
const router = express.Router()
const transactionManager = require('../collectionManagers/transactionManager')


router.get('/regenerate',async function(req,res){
    try {
        const result = await transactionManager.regenerate()
        res.send(result)
    }
    catch (error) {
        res.status(400).send(error)
    }
})
router.get('/categories', async function(req, res) {
    try {
        const sumCategory = await transactionManager.findSumCategory()
        res.send(sumCategory)
    }
    catch (error) {
        res.status(400).send(error)
    }
})
router.get('/', async function(req, res) {
    try {
        const transactions = await transactionManager.getTransactions()
        res.send(transactions)
    }
    catch (error) {
        res.status(400).send(error)
    }
})
router.post('/', async function(req, res) {
    try {
        console.log(req.body)
        const transaction = req.body
        const newTransaction = await transactionManager.addTransaction(transaction)
        res.send(newTransaction)
    }
    catch (error) {
        res.status(400).send(error)
    }
})
router.delete('/:transactionID', async function(req, res) {
    try {
        const transactionID = req.params.transactionID
        const resultDelete = await transactionManager.deleteTransaction(transactionID)
        res.send(resultDelete)
    }
    catch (error) {
        res.status(400).send(error)
    }
})





module.exports = router