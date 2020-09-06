import { AES, enc } from 'crypto-js';

class CryptoService {
  private readonly secret: string = process.env.REACT_APP_CRYPTO_SECRET!;

  encrypt(text: string): string {
    return AES.encrypt(JSON.stringify(text), this.secret).toString();
  }

  decrypt(cipher: string): string {
    const bytes = AES.decrypt(cipher, this.secret);
    return JSON.parse(bytes.toString(enc.Utf8));
  }
}

export default new CryptoService();


// var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'my-secret-key@123').toString();

// var bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key@123');
//   var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));