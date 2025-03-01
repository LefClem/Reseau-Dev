import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from 'src/app/services/auth.services';
import { LoginRequest } from 'src/app/interfaces/LoginRequest.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

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
    this.authService.login(loginRequest).subscribe({
      next: (value) => {
        console.log(value);
        localStorage.setItem("token", value.token);
        this.router.navigate(['/feed'])
      },
      error: error => {
        console.log(error);
      }
    })
  }

}
