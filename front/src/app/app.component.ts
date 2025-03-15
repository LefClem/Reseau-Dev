import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public showNavBar = true;
  public isLoginPage = false;
  public isProfilePage = false;
  private subscription: Subscription;
  public isMobile: boolean = window.innerWidth <= 768;

  constructor(private router: Router) {
    this.subscription = this.router.events.subscribe(() => {
      this.showNavBar = this.router.url !== '/';
      this.isLoginPage = this.router.url === '/login' || this.router.url === '/register';
      this.isProfilePage = this.router.url === '/profile';
    })
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }
  

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  disconnect() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
