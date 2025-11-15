import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClientOptions } from './types';

@Injectable({
  providedIn: 'root',
})
export class ApiBaseService {

  http = inject(HttpClient);
  urlPrefix = '/api';

  constructor() {
    console.debug('env', environment);
  }

  get<T>(
    endpoint: string,
    options?: HttpClientOptions,
  ): Observable<T> {
    return this.http.get<T>(`${this.urlPrefix}/${endpoint}`, options);
  }

  post<T>(
    endpoint: string,
    body: T,
    options?: HttpClientOptions,
  ): Observable<T> {
    return this.http.post<T>(`${this.urlPrefix}/${endpoint}`, body, options);
  }

  delete<T>(
    endpoint: string,
    options?: HttpClientOptions,
  ): Observable<T> {
    return this.http.delete<T>(`${this.urlPrefix}/${endpoint}`, options);
  }

  patch<T>(
    endpoint: string,
    body: T,
    options?: HttpClientOptions,
  ): Observable<T> {
    return this.http.patch<T>(`${this.urlPrefix}/${endpoint}`, body, options);
  }
}
