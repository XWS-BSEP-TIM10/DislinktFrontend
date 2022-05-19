import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponentComponent } from './front-page-component/front-page-component.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserPageComponent } from './user-page/user-page.component';
import { SearchUsersComponent } from './search-users/search-users.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{path:'', component: FrontPageComponentComponent},
                        {path:'login', component:LoginComponent},
                        {path:'registration', component: RegistrationComponent},
                        {path:'users/:id', component: UserPageComponent},
                        {path:'search-users', component: SearchUsersComponent},
                        {path:'home', component: HomeComponent}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
