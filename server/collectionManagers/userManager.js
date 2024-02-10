const User = require("../models/user")
const mailManager = require("./mailManager")

class userManager {
    static async findUserByMail(email) {
        const user = await User.findOne({ email: email })
        return user
    }
    static async addUser(user) {
        const newUser = new User(user)
        await newUser.save()
        mailManager.sendEmail(user.email)
        return newUser
    }
    static async changeBalance(userID, changedBalance){
        const user = await User.findByIdAndUpdate(userID,
            {$inc : {balance : changedBalance}}
            ,{
            new: true
          })

        return user.balance

    }

}

module.exports = userManager