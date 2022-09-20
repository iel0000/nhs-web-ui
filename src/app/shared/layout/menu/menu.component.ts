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
        ],
      },
    ];
  }
}
