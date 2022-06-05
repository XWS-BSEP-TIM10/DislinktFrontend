import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponentComponent } from './front-page-component/front-page-component.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserPageComponent } from './user-page/user-page.component';
import { SearchUsersComponent } from './search-users/search-users.component';
import { HomeComponent } from './home/home.component';
import { AccountActivatedComponent } from './account-activated/account-activated.component';
import { AccountRecoveryComponent } from './account-recovery/account-recovery.component';
import { PasswordlessLoginComponent } from './passwordless-login/passwordless-login.component';
import { AuthenticationGuard } from './auth-guards/authentication.guard';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminGuard } from './auth-guards/admin.guard';
import { JobAdPageComponent } from './job-ad-page/job-ad-page.component';

const routes: Routes = [{path:'', component: FrontPageComponentComponent},
                        {path:'login', component:LoginComponent},
                        {path:'registration', component: RegistrationComponent},
                        {path:'users/:id', component: UserPageComponent, canActivate:[AuthenticationGuard]},
                        {path:'search-users', component: SearchUsersComponent, canActivate:[AuthenticationGuard]},
                        {path:'home', component: HomeComponent, canActivate:[AuthenticationGuard]},
                        {path:'admin', component: AdminPageComponent, canActivate:[AuthenticationGuard, AdminGuard]},
                        {path: 'confirm/:token', component: AccountActivatedComponent},
                        {path: 'recover/:token', component: AccountRecoveryComponent},
                        {path: 'job-ads', component: JobAdPageComponent},
                        {path: 'login/passwordless/:token', component: PasswordlessLoginComponent}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard, AdminGuard]
})
export class AppRoutingModule { }
