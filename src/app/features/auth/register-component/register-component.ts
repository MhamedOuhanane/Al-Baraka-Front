import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../../core/auth/auth-service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);
  message = signal('');
  fieldErrors = signal<any>({});

  registerForm: FormGroup = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    role: ['CLIENT']
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
        ? null : { mismatch: true};
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.fieldErrors.set({});
      this.message.set('');

      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          alert('Compte créé avec succès !');
          // this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading.set(false);
          if (err.status === 400 && err.error.error) {
            this.fieldErrors.set(err.error.error);
          } else {
            this.message.set(err.error.message || 'Une erreur est survenue');
          }
        }
      });
    }
  }

}
