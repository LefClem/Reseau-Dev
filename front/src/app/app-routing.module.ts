import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { SubjectComponent } from './pages/subject/subject.component';
import { FeedComponent } from './pages/articles/feed/feed.component';
import { DetailComponent } from './pages/articles/detail/detail.component';
import { ProfileComponent } from './pages/profile/profile.component';

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'feed', component: FeedComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: DetailComponent, canActivate: [AuthGuard]},
  { path: 'subjects', component: SubjectComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
