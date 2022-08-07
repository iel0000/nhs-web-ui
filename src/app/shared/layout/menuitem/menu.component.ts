import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '@shared/services/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
        ],
      },
      {
        label: 'UI Components',
        items: [
          {
            label: 'Form Layout',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/uikit/formlayout'],
          },
          {
            label: 'Input',
            icon: 'pi pi-fw pi-check-square',
            routerLink: ['/uikit/input'],
          },
          {
            label: 'Float Label',
            icon: 'pi pi-fw pi-bookmark',
            routerLink: ['/uikit/floatlabel'],
          },
        ],
      },
      {
        label: 'Application Processing',
        items: [
          {
            label: 'Form Layout',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/uikit/formlayout'],
          },
          {
            label: 'Input',
            icon: 'pi pi-fw pi-check-square',
            routerLink: ['/uikit/input'],
          },
          {
            label: 'Float Label',
            icon: 'pi pi-fw pi-bookmark',
            routerLink: ['/uikit/floatlabel'],
          },
        ],
      },
    ];
  }
}
