import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { logout as logoutAction } from '../../../auth/store/auth.actions';
import { selectError, selectLoading, selectUsers } from '../../store/users.selectors';
import { deleteUser, loadUsers } from '../../store/users.actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  protected readonly users = this.store.selectSignal(selectUsers);
  protected readonly isLoading = this.store.selectSignal(selectLoading);
  protected readonly errorMessage = this.store.selectSignal(selectError);

  protected readonly searchTerm = signal('');
  protected readonly confirmMode = signal<'logout' | 'delete' | null>(null);
  protected readonly pendingDeleteUser = signal<User | null>(null);

  protected readonly filteredUsers = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const currentUsers = this.users();

    if (!term) {
      return currentUsers;
    }

    return currentUsers.filter(
      (user: User) =>
        user.username.toLowerCase().includes(term) || user.email.toLowerCase().includes(term),
    );
  });

  constructor() {
    this.store.dispatch(loadUsers());
  }

  openCreateForm(): void {
    this.router.navigate(['/users/new']);
  }

  editUser(user: User): void {
    this.router.navigate(['/users/edit', user.id]);
  }

  requestDelete(user: User): void {
    this.pendingDeleteUser.set(user);
    this.confirmMode.set('delete');
  }

  requestLogout(): void {
    this.confirmMode.set('logout');
  }

  closeConfirmation(): void {
    this.confirmMode.set(null);
    this.pendingDeleteUser.set(null);
  }

  confirmCurrentAction(): void {
    const mode = this.confirmMode();

    if (mode === 'delete') {
      const user = this.pendingDeleteUser();
      if (user) {
        this.store.dispatch(deleteUser({ id: user.id }));
      }
    }

    if (mode === 'logout') {
      this.store.dispatch(logoutAction());
      this.router.navigate(['/login']);
    }

    this.closeConfirmation();
  }

  logout(): void {
    this.requestLogout();
  }
}
