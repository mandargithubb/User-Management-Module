import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/models/user.model';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http.get<ApiResponse<User[]>>(`${environment.apiUrl}/users`).pipe(map((response) => response.data ?? []));
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<ApiResponse<User>>(`${environment.apiUrl}/users`, user).pipe(map((response) => response.data as User));
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<ApiResponse<User>>(`${environment.apiUrl}/users/${id}`, user).pipe(map((response) => response.data as User));
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${environment.apiUrl}/users/${id}`).pipe(map(() => undefined));
  }
}
