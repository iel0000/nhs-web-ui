import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/auth';
import { DashboardComponent, LoginComponent } from '@app/pages';
import { LayoutComponent } from '@shared/layout/layout.component';
import { LoginGuard } from '@core/login';
import {
  RegistrationComponent,
  PersonalComponent,
  VisaInfoComponent,
  LabRequisitionComponent,
  XrayRequisitionComponent,
  ReviewComponent,
} from '@app/pages/registration';
import { RegistrationListComponent } from '@app/pages/registration-list/registration-list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'registration-list',
        component: RegistrationListComponent,
      },
      {
        path: 'register',
        component: RegistrationComponent,
        children: [          
          { path: 'personal/:id', component: PersonalComponent },
          { path: 'visaInfo/:id', component: VisaInfoComponent },
          {
            path: 'labRequisition/:id',
            component: LabRequisitionComponent,
          },
          {
            path: 'xrayRequisition/:id',
            component: XrayRequisitionComponent,
          },
          { path: 'review/:id', component: ReviewComponent },
          { path: 'personal', component: PersonalComponent },
          { path: 'visaInfo', component: VisaInfoComponent },
          { path: 'labRequisition', component: LabRequisitionComponent },
          { path: 'xrayRequisition', component: XrayRequisitionComponent },
          { path: 'review', component: ReviewComponent },
        ],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: '**',
    component: DashboardComponent, //add error page
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
