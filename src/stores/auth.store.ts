export abstract class AuthStore {
  private static AUTH_STORE_KEY_JWT: string = 'jwt';

  public static saveUserJWTToken(token: string): void {
    localStorage.setItem(this.AUTH_STORE_KEY_JWT, token);
  }

  public static getUserJWTToken(): string | null {
    return localStorage.getItem(this.AUTH_STORE_KEY_JWT);
  }

  public static deleteUserJSWToken(): void {
    localStorage.removeItem(this.AUTH_STORE_KEY_JWT);
  }
}
