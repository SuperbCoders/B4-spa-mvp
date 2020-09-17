export abstract class AuthStore {
  private static AUTH_STORE_KEY_JWT: string = 'jwt';
  private static AUTH_STORE_KEY_REFRESH: string = 'refresh';

  public static saveUserJWTToken(token: string): void {
    localStorage.setItem(this.AUTH_STORE_KEY_JWT, token);
  }

  public static saveUserRefreshToken(token: string): void {
    localStorage.setItem(this.AUTH_STORE_KEY_REFRESH, token);
  }

  public static getUserJWTToken(): string | null {
    return localStorage.getItem(this.AUTH_STORE_KEY_JWT);
  }

  public static getUserRefreshToken(): string | null {
    return localStorage.getItem(this.AUTH_STORE_KEY_REFRESH);
  }
}
