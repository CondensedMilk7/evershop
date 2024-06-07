import { Injectable, inject } from '@angular/core';
import { ENVIRONMENT } from '../../environments/environment';
import { SignUpRequest } from '../types/auth';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly env = inject(ENVIRONMENT);
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly baseUrl = `${this.env.apiUrl}/auth`;

  isLoading$ = new BehaviorSubject<boolean>(false);

  signUp(data: SignUpRequest) {
    this.isLoading$.next(true);

    this.httpClient.post(`${this.baseUrl}/sign_up`, data).subscribe(() => {
      this.isLoading$.next(false);
      this.router.navigate(['/auth', 'sign-in'], {
        queryParams: { signUpSuccess: true },
      });
    });
  }
}
