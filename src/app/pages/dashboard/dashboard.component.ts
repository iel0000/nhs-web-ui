import { Component, OnInit } from '@angular/core';
import { faBars, faBell, faChartLine } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isOpen = false;
  faBars = faBars;
  faBell = faBell;
  faChartLine = faChartLine;

  pageTitle: string | undefined;
  constructor() {}

  ngOnInit() {
    this.pageTitle = 'Home';
  }

  // toggleNavbar(){
  //   this.isOpen = !this.isOpen;
  // }
}
