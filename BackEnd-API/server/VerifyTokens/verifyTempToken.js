const jsonToken = require('jsonwebtoken');
const User = require('../../database/models/user');


async function authTemp(req, res, next) {

    const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })

    if (!user) {
        return res.status(400).json({ error: 'Invalid Token or expired link' });
    }


    try {

        const verified = jsonToken.verify(user.resetPasswordToken, process.env.TEMP_TOKEN_CODE);
        req.user = verified;
        next();

    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
}




module.exports = authTemp;