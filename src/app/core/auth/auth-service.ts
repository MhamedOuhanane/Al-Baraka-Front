import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/auth`;

  register(registerData: any) {
    return this.http.post(`${this.API_URL}/register`, registerData);
  }
}
