import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/auth';
import { DashboardComponent, ErrorComponent, LoginComponent } from '@app/pages';
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
import { UsersComponent } from './pages/users/users.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { BranchesComponent } from './pages/admin/branches/branches.component';
import { ProfileComponent } from './pages/users/profile/profile.component';
import { BranchesFormComponent } from './pages/admin/branches/branches-form/branches-form.component';

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
          { path: 'review/:id', component: ReviewComponent },
          { path: 'personal', component: PersonalComponent },
          { path: 'visaInfo', component: VisaInfoComponent },
          { path: 'review', component: ReviewComponent },
        ],
      },
      {
        path: 'admin/users/:action',
        component: UserFormComponent,
        canActivate: [AuthGuard],
        data: { role: 'Admin' },
      },
      {
        path: 'admin/users/:action/:id',
        component: UserFormComponent,
        canActivate: [AuthGuard],
        data: { role: 'Admin' },
      },
      {
        path: 'admin/users',
        component: UsersComponent,
        canActivate: [AuthGuard],
        data: { role: 'Admin' },
      },
      {
        path: 'appointments',
        component: AppointmentsComponent,
      },
      {
        path: 'admin/branches/:action',
        component: BranchesFormComponent,
        canActivate: [AuthGuard],
        data: { role: 'Admin' },
      },
      {
        path: 'admin/branches/:action/:id',
        component: BranchesFormComponent,
        canActivate: [AuthGuard],
        data: { role: 'Admin' },
      },
      {
        path: 'admin/branches',
        component: BranchesComponent,
        canActivate: [AuthGuard],
        data: { role: 'Admin' },
      },
      {
        path: 'profile',
        component: ProfileComponent,
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
    component: ErrorComponent, //add error page
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
