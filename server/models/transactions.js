const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    amount: {
        type: Number,
        required: [true, 'Transaction amount is required']
      },
    category: {
        type: String,
        required: [true, 'Transaction category is required']
      },
    vendor: {
        type: String,
        required: [true, 'Transaction vendor is required']
      },
    date: {
        type: Date,
        required: [true, 'Transaction date is required']
      },
    user:{type: Schema.Types.ObjectId,
        ref: "user"
    }
})

const Transaction = mongoose.model("transaction", transactionSchema)
module.exports = Transaction