import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterRequest } from 'src/app/interfaces/RegisterRequest.interface';
import { AuthServices } from 'src/app/services/auth.services';
import { SubscriptionServices } from 'src/app/services/subscription.services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public subscriptions: any[] = [];
  private subscription!: Subscription;
  public isError: boolean = false;
  public errorMessage!: string;
  public user!: any;

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
    private subscriptionService: SubscriptionServices,
    private authService: AuthServices,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.subscriptionService.getSubscriptions().subscribe({
      next: (data) => this.subscriptions = data,
      error: (err) => console.error("Erreur lors de la récupération des abonnements :", err)
    });

    this.authService.getAuthUser().subscribe({
      next: data => {        
        this.user = data;

        this.form.patchValue({
          username: this.user.username,
          email: this.user.email
        });

      },
      error: error => console.error("Erreur: ", error)
    });
  }

  unSubscribe(id: number): void {
    this.subscriptionService.unSubscribe(id).subscribe({
      next: () => console.log("Désabonnement réussi"),
      error: (err) => console.error("Erreur de désabonnement :", err)
    });
  }

  onSubmit() {
    const updateRequest = this.form.value as RegisterRequest;
    console.log(updateRequest);
    this.authService.updateUser(updateRequest).subscribe({
      next: (value) => {
        console.log('Modification réussie', value);
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error: error => {
        this.isError = true;
        this.errorMessage = error.message
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
