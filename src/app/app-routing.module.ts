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
} from '@app/pages/registration/new';
import { RegistrationListComponent } from './pages/registration-list/registration-list.component';
import { EditPersonalComponent } from './pages/registration/edit/edit-personal/edit-personal.component';
import { EditRegistrationComponent } from './pages/registration/edit/edit-registration.component';
import { EditVisaInfoComponent } from './pages/registration/edit/edit-visa-info/edit-visa-info.component';
import { EditLabRequisitionComponent } from './pages/registration/edit/edit-lab-requisition/edit-lab-requisition.component';
import { EditXrayRequisitionComponent } from './pages/registration/edit/edit-xray-requisition/edit-xray-requisition.component';
import { EditReviewComponent } from './pages/registration/edit/edit-review/edit-review.component';

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
          { path: '', redirectTo: 'personal', pathMatch: 'full' },
          { path: 'personal', component: PersonalComponent },
          { path: 'visaInfo', component: VisaInfoComponent },
          { path: 'labRequisition', component: LabRequisitionComponent },
          { path: 'xrayRequisition', component: XrayRequisitionComponent },
          { path: 'review', component: ReviewComponent },
        ],
      },
      {
        path: 'register',
        component: EditRegistrationComponent,
        children: [
          { path: '', redirectTo: 'personal/:id', pathMatch: 'full' },
          { path: 'personal/:id', component: EditPersonalComponent },
          { path: 'visaInfo/:id', component: EditVisaInfoComponent },
          {
            path: 'labRequisition/:id',
            component: EditLabRequisitionComponent,
          },
          {
            path: 'xrayRequisition/:id',
            component: EditXrayRequisitionComponent,
          },
          { path: 'review/:id', component: EditReviewComponent },
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
