import {Injectable, inject, signal, computed} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CookieService} from '../services/cookie-service';
import {lastValueFrom} from 'rxjs';

export interface UserState {
  uuid: String | null,
  token: String | null,
  role: string | null
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  private readonly API_URL = `${environment.apiUrl}/auth`;

  private authState = signal<UserState>({
    uuid: this.cookieService.getCookie("uuid") || null,
    token: this.cookieService.getCookie("token") || null,
    role: this.cookieService.getCookie("role") || null
  });

  register(registerData: any) {
    return this.http.post(`${this.API_URL}/register`, registerData);
  }

  isAuthenticated = computed(() => !!this.authState().token)
  userRole = computed(() => this.authState().role)

  async login(loginData: any) {
    const res = await lastValueFrom(this.http.post<any>(`${this.API_URL}/login`, loginData));
    if (!!res.data) {
      this.cookieService.setCookies("uuid", res.data?.uuid, 1);
      this.cookieService.setCookies("token", res.data?.accessToken, 1);
      this.cookieService.setCookies("role", res.data?.role, 1);

      this.authState.set({
        uuid: res.data?.uuid,
        token: res.data?.accessToken,
        role: res.data?.role
      });
    }

    return res;
  }
}
