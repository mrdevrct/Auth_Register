/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptoJS from "crypto-js";

// کلید مخفی (در تولید، این را در .env یا سرور نگه دارید)
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY  || "X7b9kP2mW8qL3zT9rY6vN5xJ4hF2gD8s"; // جایگزین با کلید امن خود کنید

// تابع رمزنگاری
export const encryptData = (data: Record<string, any>): string => {
  try {
    const dataString = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(dataString, SECRET_KEY).toString();
    return encrypted;
  } catch (error) {
    console.error("Encryption error:", error);
    return "";
  }
};

// تابع رمزگشایی
export const decryptData = (encryptedData: string): Record<string, any> | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};
