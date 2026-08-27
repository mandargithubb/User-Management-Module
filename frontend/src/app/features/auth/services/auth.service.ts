import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse, LoginRequest, LoginResponse } from '../../../core/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<ApiResponse<LoginResponse>>(`${environment.apiUrl}/auth/login`, payload)
      .pipe(map((response) => response.data ?? ({ token: '', user: { id: 0, username: payload.username, email: '', jobRole: 'tech' } } as LoginResponse)));
  }
}
