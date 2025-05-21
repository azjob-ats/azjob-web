import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iLanguage } from '../interfaces/language.interface';

@Injectable({ providedIn: 'root' })
export class LanguageApiservice {
  public getAllLanguage(): Observable<iLanguage[]> {
    throw new Error('Method not implemented.');
  }

  public getLanguage(): Observable<iLanguage> {
    throw new Error('Method not implemented.');
  }

  public addLanguage(prefix: string): Observable<iLanguage> {
    throw new Error('Method not implemented.' + prefix);
  }
}
