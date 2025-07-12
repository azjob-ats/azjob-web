import { Injectable } from '@angular/core';
import { TypeObjectUtil } from '@shared/utils/type-object.util';

@Injectable({ providedIn: 'root' })
export class CryptoService<T> {
  private algorithm = { name: 'AES-GCM', length: 256 };
  private ivLength = 12;

  private encode(text: string): Uint8Array {
    return new TextEncoder().encode(text);
  }

  private decode(buffer: ArrayBuffer): string {
    return new TextDecoder().decode(buffer);
  }

  private async getKey(secret: string): Promise<CryptoKey> {
    const enc = this.encode(secret);
    return crypto.subtle.importKey(
      'raw',
      await crypto.subtle.digest('SHA-256', enc),
      this.algorithm,
      false,
      ['encrypt', 'decrypt']
    );
  }

  public async encrypt(value: T, secretKey: string): Promise<string> {
    const iv = crypto.getRandomValues(new Uint8Array(this.ivLength));
    const key = await this.getKey(secretKey);
    const data = this.encode(JSON.stringify(value));

    const encrypted = await crypto.subtle.encrypt({ ...this.algorithm, iv }, key, data);

    const encryptedArray = new Uint8Array(encrypted);
    const fullData = new Uint8Array(iv.byteLength + encryptedArray.byteLength);
    fullData.set(iv, 0);
    fullData.set(encryptedArray, iv.byteLength);

    return btoa(String.fromCharCode(...fullData));
  }

  public async decrypt(ciphertext: string, secretKey: string): Promise<T> {
    ciphertext = ciphertext.replace(/['"]/g, '');

    const data = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
    const iv = data.slice(0, this.ivLength);
    const encryptedData = data.slice(this.ivLength);
    const key = await this.getKey(secretKey);

    const decrypted = await crypto.subtle.decrypt({ ...this.algorithm, iv }, key, encryptedData);

    return TypeObjectUtil.setValue(this.decode(decrypted)) as T;
  }
}
