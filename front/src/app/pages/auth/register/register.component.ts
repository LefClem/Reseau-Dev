import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from 'src/app/services/auth.services';
import { RegisterRequest } from 'src/app/interfaces/RegisterRequest.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public isError: boolean = false;
  public errorMessage!: string;

  public form = this.fb.group({
    username: [
      '', 
      [
        Validators.required,
        Validators.min(5)
      ]
    ],
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
        Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-+=]).{8,30}$")
      ]
    ]
  })

  constructor(
    private authService: AuthServices,
    private fb: FormBuilder,
    private router: Router
    ) { }

  onSubmit(){
    const registerRequest = this.form.value as RegisterRequest;
    this.authService.register(registerRequest).subscribe({
      next: (value) => {
        console.log("Inscription réussie :", value);
        this.router.navigate(['/login']);
      },
      error: error => {
        console.log(error);
        this.isError = true;
        this.errorMessage = error.error.message;
      }
    })
  }

}
