import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from 'src/app/services/auth.services';
import { LoginRequest } from 'src/app/interfaces/LoginRequest.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public isMobile: boolean = window.innerWidth <= 768;
  public isError: boolean = false;
  private loginSubscription!: Subscription;

  public form = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      '',
      [
        Validators.required,
      ]
    ]
  })

  constructor(
    private authService: AuthServices,
    private fb: FormBuilder,
    private router: Router
  ) { }

  onSubmit(){
    const loginRequest = this.form.value as LoginRequest;
    this.loginSubscription = this.authService.login(loginRequest).subscribe({
      next: (value) => {
        localStorage.setItem("token", value.token);
        this.router.navigate(['/feed'])
      },
      error: error => {
        this.isError = true;
      }
    })
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

}
