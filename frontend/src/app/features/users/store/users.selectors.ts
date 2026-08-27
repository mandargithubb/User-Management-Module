import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>('users');
export const selectUsers = createSelector(selectUsersState, (state) => state.users);
export const selectLoading = createSelector(selectUsersState, (state) => state.loading);
export const selectError = createSelector(selectUsersState, (state) => state.error);
export const selectSelectedUser = createSelector(selectUsersState, (state) => state.users.find((user) => user.id === state.selectedUserId) ?? null);
