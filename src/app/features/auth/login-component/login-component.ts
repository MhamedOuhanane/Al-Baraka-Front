import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../core/auth/auth-service';
import {Router, RouterLink} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);
  message = signal('');
  fieldErrors = signal<any>({});

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.fieldErrors.set({})
      this.message.set('');

      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          alert('Connexion réussie ! Redirection...')
          // this.router.navigate(["/dashboard"]);
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
