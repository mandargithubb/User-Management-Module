import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/components/login/login.component').then((m) => m.LoginComponent),
    canActivate: [guestGuard],
  },
  {
    path: 'users',
    loadComponent: () => import('./features/users/components/user-list/user-list.component').then((m) => m.UserListComponent),
    canActivate: [authGuard],
  },
  {
    path: 'users/new',
    loadComponent: () => import('./features/users/components/user-form/user-form.component').then((m) => m.UserFormComponent),
    canActivate: [authGuard],
  },
  {
    path: 'users/edit/:id',
    loadComponent: () => import('./features/users/components/user-form/user-form.component').then((m) => m.UserFormComponent),
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
