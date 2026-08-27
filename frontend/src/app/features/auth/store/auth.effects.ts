import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { login, loginFailure, loginSuccess } from './auth.actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ username, password }) =>
        this.authService.login({ username, password }).pipe(
          map((response) => loginSuccess({ user: response.user, token: response.token })),
          catchError((error: { error?: { message?: string } }) => of(loginFailure({ error: error?.error?.message ?? 'Login failed' }))),
        ),
      ),
    ),
  );
}
