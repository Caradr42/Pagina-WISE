const jsonToken = require('jsonwebtoken');

function auth(req, res, next) {

    const token = req.header('auth-token');

    if (!token) return res.status(401).json({ error: 'Acces denied' });

    try {

        const verified = jsonToken.verify(token, process.env.TOKEN_CODE);
        req.user = verified;
        next();


    } catch (err) {
        res.status(400).json({ error: 'Invalid Token' });
    }
}



module.exports = auth;