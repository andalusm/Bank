const express = require('express')
const router = express.Router()
const transactionManager = require('../collectionManagers/transactionManager')
const Utilities = require('../utility')


router.get('/regenerate',async function(req,res){
    try {
        const result = await transactionManager.regenerate()
        res.send(result)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.get('/category/:categoryName/:userID',Utilities.authenticateToken,async function(req,res){
    try {
        const categoryName = req.params.categoryName
        const userID = req.params.userID
        const month = req.query.month
        const result = await transactionManager.getCategory(categoryName, month, userID)
        res.send(result)
    }
    catch (error) {
        res.status(400).send(error)
    }

})
router.get('/categories/:month/:userID',Utilities.authenticateToken, async function(req, res) {
    try {
        const month = req.params.month
        const userID = req.params.userID
        const sumCategory = await transactionManager.findSumCategory(month, userID)
        res.send(sumCategory)
    }
    catch (error) {
        res.status(400).send(error)
    }
})
router.get('/categories/:userID',Utilities.authenticateToken, async function(req, res) {
    try {
        const userID = req.params.userID
        const sumCategory = await transactionManager.findSumCategory("0", userID)
        res.send(sumCategory)
    }
    catch (error) {
        console.log(error.message)
        res.status(400).send(error)
    }
})
router.delete('/:transactionID',Utilities.authenticateToken, async function(req, res) {
    try {
        const transactionID = req.params.transactionID
        const resultDelete = await transactionManager.deleteTransaction(transactionID)
        res.send(resultDelete)
    }
    catch (error) {
        res.status(400).send(error)
    }
})


router.get('/:userID',Utilities.authenticateToken, async function(req, res) {
    try {
        const userID = req.params.userID
        const transactions = await transactionManager.getTransactions(userID)
        res.send(transactions)
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.post('/:userID', Utilities.authenticateToken, async function(req, res) {
    try {
        const userID = req.params.userID
        const transaction = {...req.body, user:userID}
        const newTransaction = await transactionManager.addTransaction(transaction)
        res.send({balance:newTransaction.balance})
    }
    catch (error) {
        res.status(400).send(error)
    }
})





module.exports = router