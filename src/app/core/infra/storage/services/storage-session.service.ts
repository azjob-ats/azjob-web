import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageSessionService<T> {
  public save(key: string, value: any | T): boolean {
    sessionStorage.removeItem(key);
    sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  public delete(key: string): boolean {
    sessionStorage.removeItem(key);
    return true;
  }

  public fetch(key: string): any | T {
    return JSON.parse(sessionStorage.getItem(key)!);
  }
}
