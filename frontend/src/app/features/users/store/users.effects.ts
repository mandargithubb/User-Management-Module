import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserService } from '../services/user.service';
import {
  addUser,
  addUserFailure,
  addUserSuccess,
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
} from './users.actions';

@Injectable()
export class UsersEffects {
  private readonly actions$ = inject(Actions);
  private readonly userService = inject(UserService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error: { error?: { message?: string } }) => of(loadUsersFailure({ error: error?.error?.message ?? 'Unable to load users' }))),
        ),
      ),
    ),
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      switchMap(({ user }) =>
        this.userService.createUser(user).pipe(
          map((createdUser) => addUserSuccess({ user: createdUser })),
          catchError((error: { error?: { message?: string } }) => of(addUserFailure({ error: error?.error?.message ?? 'Unable to add user' }))),
        ),
      ),
    ),
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      switchMap(({ user }) =>
        this.userService.updateUser(user.id, user).pipe(
          map((updatedUser) => updateUserSuccess({ user: updatedUser })),
          catchError((error: { error?: { message?: string } }) => of(updateUserFailure({ error: error?.error?.message ?? 'Unable to update user' }))),
        ),
      ),
    ),
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      switchMap(({ id }) =>
        this.userService.deleteUser(id).pipe(
          map(() => deleteUserSuccess({ id })),
          catchError((error: { error?: { message?: string } }) => of(deleteUserFailure({ error: error?.error?.message ?? 'Unable to delete user' }))),
        ),
      ),
    ),
  );
}
