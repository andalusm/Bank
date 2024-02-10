const jwt = require('jsonwebtoken');
const secretKey = 'my_secret_key';

const authenticateToken = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(401);
        }

        req.user = user;
        next();
    });
}
module.exports = {authenticateToken}