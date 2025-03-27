import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from 'src/app/services/auth.services';
import { RegisterRequest } from 'src/app/interfaces/RegisterRequest.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {

  public isMobile: boolean = window.innerWidth <= 768;
  public isError: boolean = false;
  public errorMessage!: string;
  private registerSubscription!: Subscription;
  
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

  onSubmit(): void {
    const registerRequest = this.form.value as RegisterRequest;
    this.registerSubscription = this.authService.register(registerRequest).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: error => {
        this.isError = true;
        this.errorMessage = error.error.message;
      }
    })
  }

  ngOnDestroy(): void {
      if(this.registerSubscription){
        this.registerSubscription.unsubscribe();
      }
  }

}
