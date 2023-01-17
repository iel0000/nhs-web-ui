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
import { ErrorComponent } from './pages/error/error.component';
import { DatePipe } from '@angular/common';
import { BranchesComponent } from './pages/admin/branches/branches.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { ProfileComponent } from './pages/users/profile/profile.component';
import { BranchesFormComponent } from './pages/admin/branches/branches-form/branches-form.component';
import { DetailsComponent } from './pages/registration-list/details/details.component';
import { AppointmentDetailsComponent } from './pages/appointments/appointment-details/appointment-details.component';

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
    ErrorComponent,
    BranchesComponent,
    AppointmentsComponent,
    ProfileComponent,
    BranchesFormComponent,
    DetailsComponent,
    AppointmentDetailsComponent,
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
          'web-api.nationwidehealthsystems.com',
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
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
