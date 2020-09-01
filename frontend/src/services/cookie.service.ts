import Cookie, { CookieSetOptions } from 'universal-cookie';


class CookieService {
  private readonly cookie: Cookie;

  constructor() {
    this.cookie = new Cookie();
  }

  get(key: string) {
    return this.cookie.get(key);
  }

  getAccessToken(): string | null {
    const token = this.cookie.get('access_token');
    return token ? token : null;
  }

  set(key: string, value: string, options?: CookieSetOptions) {
    this.cookie.set(key, value, options);
  }

  setAccessToken(value: string) {
    const options: CookieSetOptions = {
      sameSite: 'strict',
      path: '/'
    };
    this.cookie.set('access_token', value, options);
  }

  remove(key: string) {
    this.cookie.remove(key);
  }

  removeAccessToken() {
    this.cookie.remove('access_token');
  }
}

export default new CookieService();