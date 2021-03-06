import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontPageComponentComponent } from './front-page-component/front-page-component.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserPageComponent } from './user-page/user-page.component';
import { SearchUsersComponent } from './search-users/search-users.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostComponent } from './post/post.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { LinkyModule } from 'ngx-linky';
import { InterestComponent } from './interest/interest.component';
import { InterestModalComponent } from './interest-modal/interest-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExperienceCardComponent } from './experience-card/experience-card.component';
import { ExperienceModalComponent } from './experience-modal/experience-modal.component';
import { AccountActivatedComponent } from './account-activated/account-activated.component';
import { AccountRecoveryComponent } from './account-recovery/account-recovery.component';
import { PasswordlessLoginComponent } from './passwordless-login/passwordless-login.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { JobAdCardComponent } from './job-ad-card/job-ad-card.component';
import { JobAdPageComponent } from './job-ad-page/job-ad-page.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { PendingProfileCardComponent } from './pending-profile-card/pending-profile-card.component';
import { ChatPageComponent } from './chat-page/chat-page.component';


@NgModule({
    declarations: [
        AppComponent,
        FrontPageComponentComponent,
        LoginComponent,
        RegistrationComponent,
        UserPageComponent,
        SearchUsersComponent,
        HomeComponent,
        NavbarComponent,
        PostComponent,
        ProfilePictureComponent,
        InterestComponent,
        InterestModalComponent,
        ExperienceCardComponent,
        ExperienceModalComponent,
        AccountActivatedComponent,
        AccountRecoveryComponent,
        PasswordlessLoginComponent,
        AdminPageComponent,
        JobAdCardComponent,
        JobAdPageComponent,
        ProfileCardComponent,
        PendingProfileCardComponent,
        ChatPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        LinkyModule,
        NgbModule,
    ],
    
    providers: [AppComponent,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }],
    bootstrap: [AppComponent]
})
export class AppModule { }
