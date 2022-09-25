import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent, LoginComponent } from '@app/pages';
import {
  RegistrationComponent,
  PersonalComponent,
  VisaInfoComponent,
  LabRequisitionComponent,
  XrayRequisitionComponent,
  ReviewComponent,
} from '@app/pages/registration';
import { StoreModule } from '@ngrx/store';
import { registrationPageReducer } from '@app/pages/registration/store';
import { JwtModule } from '@auth0/angular-jwt';
import { RegistrationListComponent } from './pages/registration-list/registration-list.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from '@core/interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersComponent } from './pages/users/users.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistrationComponent,
    PersonalComponent,
    VisaInfoComponent,
    LabRequisitionComponent,
    XrayRequisitionComponent,
    ReviewComponent,
    RegistrationListComponent,
    SpinnerComponent,
    UsersComponent,
    UserFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ registration: registrationPageReducer }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [
          'localhost:44370',
          'stage-webapi.nationwidehealthsystems.com',
        ],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
