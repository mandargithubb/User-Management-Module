import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { addUser, updateUser } from '../../store/users.actions';
import { selectUsers } from '../../store/users.selectors';
import { User, JobRole } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  readonly mode = signal<'create' | 'edit'>('create');
  readonly selectedUserId = signal<number | null>(null);

  readonly form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    jobRole: ['', [Validators.required]],
  });

  get username() { return this.form.controls.username; }
  get email() { return this.form.controls.email; }
  get jobRole() { return this.form.controls.jobRole; }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      return;
    }

    const userId = Number(idParam);
    this.mode.set('edit');
    this.selectedUserId.set(userId);

    const users = this.store.selectSignal(selectUsers)();
    const existingUser = users.find((user) => user.id === userId);

    if (existingUser) {
      this.form.patchValue(existingUser);
      return;
    }

    this.store
      .select(selectUsers)
      .pipe(
        filter((usersList) => usersList.some((user) => user.id === userId)),
        take(1),
      )
      .subscribe((usersList) => {
        const matchedUser = usersList.find((user) => user.id === userId);
        if (matchedUser) {
          this.form.patchValue(matchedUser);
        }
      });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();
    const userPayload: User = {
      id: this.selectedUserId() ?? Date.now(),
      username: payload.username,
      email: payload.email,
      jobRole: payload.jobRole as JobRole,
    };

    if (this.mode() === 'edit' && this.selectedUserId()) {
      this.store.dispatch(updateUser({ user: userPayload }));
    } else {
      this.store.dispatch(addUser({ user: { username: payload.username, email: payload.email, jobRole: payload.jobRole as JobRole } }));
    }

    this.router.navigate(['/users']);
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}
