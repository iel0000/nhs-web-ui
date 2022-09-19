import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
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
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.pageTitle = 'Home';

    this.http.get(`${environment.apiUrl}/api/Client/GetEmbassies`).subscribe({
      next: (result: any) => console.log(result),
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }

  // toggleNavbar(){
  //   this.isOpen = !this.isOpen;
  // }
}
