import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/auth';
import { IUser } from '@shared/interface';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '@shared/services/app.layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  currentUser: IUser | undefined;
  items!: MenuItem[];
  loading = [false, false, false, false];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public layoutService: LayoutService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
    this.items = [
      {
        label: `${this.currentUser?.firstName} ${this.currentUser?.lastName}`,
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: [`profile`],
          },
          {
            label: 'Logout',
            icon: 'pi pi-fw pi-power-off',
            command: () => this.logout(),
          },
        ],
      },
    ];
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  get isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }
}
