const encrpyt_decrypt = require('../services/encrypt_decrypt.js');

const validate_user = (req, res, next) => {
    const accessToken = req.headers['access_token'];
    if (!accessToken) {
        return res.status(400).json({ error: 'Missing tenant information' });
    }
    const user = encrpyt_decrypt.decryptData(accessToken);
    if(!user.tenant_name) {
        req.tenant_name = user.tenant_name;
    }
    next();
};
module.exports = validate_user