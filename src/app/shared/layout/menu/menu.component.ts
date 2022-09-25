import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '@shared/services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  get isAdmin(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser.role.some((x: any) => x === 'Admin')) {
      return true;
    }
    return false;
  }
  ngOnInit() {
    this.model = [
      {
        label: 'Menu',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: ['dashboard'],
          },
          {
            label: 'Register',
            icon: 'pi pi-fw pi-database',
            routerLink: ['registration-list'],
          },
          {
            label: 'Users',
            icon: 'pi pi-fw pi-user',
            routerLink: ['users'],
            visible: this.isAdmin,
          },
        ],
      },
    ];
  }
}
