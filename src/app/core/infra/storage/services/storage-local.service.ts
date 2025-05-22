import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageLocalService<T> {
  public save(key: string, value: any | T): boolean {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  public delete(key: string): boolean {
    localStorage.removeItem(key);
    return true;
  }

  public fetch(key: string): Promise<any | T> {
    return JSON.parse(localStorage.getItem(key)!);
  }
}
