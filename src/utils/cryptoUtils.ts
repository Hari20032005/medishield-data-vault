
import CryptoJS from 'crypto-js';

// Encrypt data using AES
export const encryptData = (data: string, secretKey: string): string => {
  const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
  return encryptedData;
};

// Decrypt data using AES
export const decryptData = (encryptedData: string, secretKey: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedData) {
      throw new Error('Decryption failed: Invalid key or corrupted data');
    }
    return decryptedData;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Decryption failed: Invalid key or corrupted data');
  }
};

// Generate SHA-512 hash
export const generateSHA512Hash = (data: string): string => {
  return CryptoJS.SHA512(data).toString();
};

// Convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Convert base64 back to file
export const base64toFile = (dataUrl: string, filename: string): File => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

// Check if string is valid base64
export const isValidBase64 = (str: string): boolean => {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
};

// Extract file info from base64
export const getFileInfoFromBase64 = (dataUrl: string): { type: string, extension: string } => {
  try {
    const mime = dataUrl.match(/:(.*?);/)![1];
    let extension = '';
    
    switch (mime) {
      case 'image/jpeg':
        extension = 'jpg';
        break;
      case 'image/png':
        extension = 'png';
        break;
      case 'image/gif':
        extension = 'gif';
        break;
      case 'text/csv':
        extension = 'csv';
        break;
      default:
        extension = 'unknown';
    }
    
    return { type: mime, extension };
  } catch (error) {
    return { type: 'unknown', extension: 'unknown' };
  }
};
