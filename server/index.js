const express = require("express");
const bodyParser = require('body-parser')
const api = require('./routes/transactionApi')

const PORT = process.env.PORT || 3001;

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const DBManager = require('./DBManager');
DBManager.connectToDB()

app.use('/api', api)


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});