import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  setCookies(name: string, value: string, days: number = 1) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60));
    document.cookie = `${name}=${value}; expires=${date}; path=/; SameSite=Strict; Secure`;
  }

  getCookie(name: string): string | null {
    const nameLen = name + "=";
    const ca = document.cookie.split(';');
    for (let c of ca) {
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(nameLen) === 0) return c.substring(nameLen.length, c.length);
    }
    return null;
  }

  deleteCookie(name: string) {
    this.setCookies(name, '', -1);
  }
}
