import CryptoJS from "crypto-js";
const crypto = require("crypto");

const secretKey = "contrasena secreta";

export const encryptPassword = (password: string) => {
  return CryptoJS.AES.encrypt(password, secretKey).toString();
};

export const decryptPassword = (encryptedPassword: string) => {
  return CryptoJS.AES.decrypt(encryptedPassword, secretKey).toString(
    CryptoJS.enc.Utf8
  );
};

export const generateSalt = () => {
  const saltLength = 16; // Longitud en bytes (128 bits)
  return crypto.randomBytes(saltLength).toString("base64");
};
