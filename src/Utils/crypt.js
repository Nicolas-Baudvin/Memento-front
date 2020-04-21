import CryptoJS from 'crypto-js';

/**
 * @param {Object} dataToDecrypt
 */
export const decryptUserData = (dataToDecrypt) => {

  const bytes = CryptoJS.AES.decrypt(dataToDecrypt, process.env.SECRET_CRYPTO_KEY);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return decryptedData;
};

/**
 * @param {Object} dataToEncrypt
 */
export const cryptUserData = (dataToEncrypt) => {
  return CryptoJS.AES.encrypt(JSON.stringify(dataToEncrypt), process.env.SECRET_CRYPTO_KEY).toString();
};
