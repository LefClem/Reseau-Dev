import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';

  showNavBar = true;
  private subscription: Subscription;

  constructor(private router: Router){
    this.subscription = this.router.events.subscribe(() => {
      this.showNavBar = this.router.url !== '/'
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
