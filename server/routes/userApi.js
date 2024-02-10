const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const userManager = require('../collectionManagers/userManager')


function hashPassword (user){
  const hashedPassword = bcrypt.hashSync(user.password, salt);
  return  hashedPassword;
}

async function authenticateUser(email, password) {
  const user = await userManager.findUserByMail(email);
  if (!user) {
    return null;
  }
  const isPasswordValid = bcrypt.compareSync(password,hashPassword(user));
  if (!isPasswordValid) {
    return null;
  }
  return user;
}
function generateAccessToken(user) {
  return jwt.sign(user, secretKey);
}


router.post('/login', async function (req, res) {
  const { email, password } = req.body;
  const user = await authenticateUser(email, password);
  if (!user) {
    return res.status(401).send({ message: 'Invalid username or password' });
  }
  const accessToken = generateAccessToken(user.toJSON());
  res.send({ accessToken , id : user._id, name:(user.firstName+" "+ user.lastName), balance:user.balance});
});
const secretKey = 'my_secret_key';

router.post('/register', async function(req, res){
  try{
      const userData = req.body
      const user = await userManager.addUser(userData)      
      const accessToken = generateAccessToken(user.toJSON());
      res.send({ accessToken , id : user._id, name:(user.firstName+" "+ user.lastName), balance:user.balance });
  }
  catch (error) {
      res.status(401).send({ message: error.message })
  }
})

module.exports = router;
