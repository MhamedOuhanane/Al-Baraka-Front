import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../core/auth/auth-service';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  // private router = inject(Router);

  isLoading = signal(false);
  message = signal('');
  fieldErrors = signal<any>({});

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.fieldErrors.set({})
      this.message.set('');

      try {
        await this.authService.login(this.loginForm.value);

        this.isLoading.set(false);
        alert('Connexion réussie ! Redirection...')
        // this.router.navigate(["/dashboard"]);
      } catch (err: any) {
        this.isLoading.set(false);
        if (err.status === 400 && err.error.error) {
          this.fieldErrors.set(err.error.error);
        } else {
          this.message.set(err.error.message || 'Une erreur est survenue');
        }
      }
    }
  }

}
