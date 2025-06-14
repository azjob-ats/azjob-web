import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from '@domain/change-language/interfaces/language.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LanguageApiService {
  private readonly baseUrl = `${environment.API_BASE_URL}/${environment.API.JOBS}`;

  public constructor(private http: HttpClient) { }

  public getAllLanguage(): Observable<Language[]> {
    throw new Error('Method not implemented.');
  }

  public getLanguage(): Observable<Language> {
    throw new Error('Method not implemented.');
  }

  public addLanguage(prefix: string): Observable<Language> {
    throw new Error('Method not implemented.' + prefix);
  }

  public getById(id: string) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Language>(url);
  }
}
