import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {environment} from '../../../environments/environment';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private platformId = inject(PLATFORM_ID);

  setCookies(name: string, value: string, days: number = 1) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60));
    const secure = environment.cookieSecure ? 'Secure;' : '';

    document.cookie = `${name}=${value}; expires=${date}; path=/; SameSite=Strict; ${secure}`;
  }

  getCookie(name: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const nameLen = name + "=";
      const ca = document.cookie.split(';');
      for (let c of ca) {
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameLen) === 0) return c.substring(nameLen.length, c.length);
      }
    }
    return null;
  }

  deleteCookie(name: string) {
    this.setCookies(name, '', -1);
  }
}
