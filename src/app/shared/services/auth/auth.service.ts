import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { POST_Login, POST_Logout, POST_TwoFactor } from '../../constants';
import { JwtToken } from '../../models/jwt-token.model';
import { LoginRequestModel } from '../../models/login-body-request.model';
import { TwoFactorRequestModel } from '../../models/two-factor-request.model';
import { ApiService } from '../api/api.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token';

  constructor(private apiService: ApiService, private cookie: CookieService) {}

  public setToken(token: JwtToken) {
    const currentDate = new Date();
    this.cookie.put(this.tokenKey, token, {
      expires: new Date(currentDate.setMonth(currentDate.getMonth() + 6)),
    });
  }

  public getToken(): JwtToken | undefined {
    return this.cookie.get(this.tokenKey);
  }

  public deleteToken(): void {
    this.cookie.remove(this.tokenKey);
  }

  public login({
    username,
    password,
  }: LoginRequestModel): Observable<JwtToken> {
    return this.apiService.post(POST_Login, { username, password });
  }

  public twoFactor({
    username,
    verificationCode,
    twoFactorIdentifier,
    verificationMethod,
  }: TwoFactorRequestModel): Observable<JwtToken> {
    return this.apiService.post(POST_TwoFactor, {
      username,
      verificationCode,
      twoFactorIdentifier,
      verificationMethod,
    });
  }

  public logout(): Observable<void> {
    return this.apiService.post(POST_Logout, {});
  }
}
