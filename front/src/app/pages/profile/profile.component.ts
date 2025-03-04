import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SubscriptionServices } from 'src/app/services/subscription.services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private subscriptionService: SubscriptionServices
  ) { }
  public subscriptions$!: Observable<any[]>;
  
  ngOnInit(): void {
    this.subscriptions$ = this.subscriptionService.getSubscriptions();
  }

  unSubscribe(id: number) {
    console.log("Désabonnement de l'ID :", id);

    this.subscriptionService.unSubscribe(id).subscribe({
      next: () => console.log("Désabonnement réussi"),
      error: (err) => console.error("Erreur de désabonnement :", err)
    });
  }

}
