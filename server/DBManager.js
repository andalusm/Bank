const mongoose = require('mongoose')

class DBManager{
    static connectToDB(){
        mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/BankDB', { useNewUrlParser: true })
    }
}
module.exports = DBManager