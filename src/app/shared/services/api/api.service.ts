import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PREFIX } from '../../constants';
import { HttpOption } from '../../models/http-option.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public post(api: string, body: any, options?: HttpOption): Observable<any> {
    return this.httpClient.post(
      this.composeApiUrl(api),
      body,
      Object.assign({ withCredentials: true }, options)
    );
  }

  private composeApiUrl(api: string): string {
    // TODO: Manage different env
    return `http://localhost:8080/${API_PREFIX}${api}`;
  }
}
