import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';
import { TypeObjectUtil } from '@shared/utils/type-object.util';

@Injectable({ providedIn: 'root' })
export class CryptoService<T> {
  public encrypt(value: any | T, secretKey: string): string {
    let valueToEncrypt: any = value;
    const VALUE_IS_NOT_STRING = typeof value !== 'string';

    if (VALUE_IS_NOT_STRING) {
      valueToEncrypt = JSON.stringify(value);
    }

    const ciphertext = CryptoJS.AES.encrypt(valueToEncrypt, secretKey).toString();

    return ciphertext;
  }

  public decrypt(ciphertext: string, secretKey: string): any {
    //substitui todas as aspas simples (') e duplas (") por uma string vazia.
    ciphertext = ciphertext.replace(/['"]/g, '');

    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedData) {
      throw new Error('NOTE.FAILED_DECRYPT');
    }

    return TypeObjectUtil.setValue(decryptedData);
  }
}
