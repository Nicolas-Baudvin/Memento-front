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


export const cryptStringData = (string) => (
  CryptoJS.AES.encrypt(string, process.env.SECRET_CRYPTO_KEY)
);


export const decryptStringData = (cryptedString) => (
  JSON.parse(CryptoJS.AES.decrypt(cryptedString, process.env.SECRET_CRYPTO_KEY).toString(CryptoJS.enc.Utf8))
);
