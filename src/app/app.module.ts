import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent, LoginComponent } from '@app/pages';
import {
  RegistrationComponent,
  PersonalComponent,
  VisaInfoComponent,
  LabRequisitionComponent,
  XrayRequisitionComponent,
  ReviewComponent,
} from '@app/pages/registration';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
