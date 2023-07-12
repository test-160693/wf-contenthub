const crypto = require('crypto');

const secretKey = 'email-management-system';
const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16); // Initialization Vector (IV)

// Encrypt data
const encryptData = (data) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encryptedData = cipher.update(data, 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
};

// Decrypt data
const decryptData = (encryptedData) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
};

module.exports = { encryptData, decryptData}