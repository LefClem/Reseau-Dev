import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/interceptors/jwt.interceptor';
import { SubjectComponent } from './pages/subject/subject.component';
import { FeedComponent } from './pages/articles/feed/feed.component';
import { DetailComponent } from './pages/articles/detail/detail.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, RegisterComponent, FeedComponent, DetailComponent, SubjectComponent, ProfileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
