import { createReducer, on } from '@ngrx/store';
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

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUserId: number | null;
}

export interface User {
  id: number;
  username: string;
  email: string;
  jobRole: 'tech' | 'id' | 'gd' | 'qa';
}

export const initialUsersState: UsersState = {
  users: [],
  loading: false,
  error: null,
  selectedUserId: null,
};

export const usersReducer = createReducer(
  initialUsersState,
  on(loadUsers, (state) => ({ ...state, loading: true, error: null })),
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false, error: null })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(addUser, (state) => ({ ...state, loading: true, error: null })),
  on(addUserSuccess, (state, { user }) => ({ ...state, users: [user, ...state.users], loading: false, error: null })),
  on(addUserFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(updateUser, (state) => ({ ...state, loading: true, error: null })),
  on(updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((existingUser) => (existingUser.id === user.id ? user : existingUser)),
    loading: false,
    error: null,
  })),
  on(updateUserFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(deleteUser, (state) => ({ ...state, loading: true, error: null })),
  on(deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== id),
    loading: false,
    error: null,
  })),
  on(deleteUserFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
