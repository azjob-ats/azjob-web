import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iLanguage } from '../interfaces/language.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LanguageApiService {
  private readonly baseUrl = `${environment.apiBaseUrl}/${environment.API.JOBS}`;

  public constructor(private http: HttpClient) {}

  public getAllLanguage(): Observable<iLanguage[]> {
    throw new Error('Method not implemented.');
  }

  public getLanguage(): Observable<iLanguage> {
    throw new Error('Method not implemented.');
  }

  public addLanguage(prefix: string): Observable<iLanguage> {
    throw new Error('Method not implemented.' + prefix);
  }

  public getById(id: string) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<iLanguage>(url);
  }
}
