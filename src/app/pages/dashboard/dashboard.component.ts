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
  basicData: any;
  basicOptions: any;

  pageTitle: string | undefined;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.pageTitle = 'Home';

    this.http.get(`${environment.apiUrl}/api/Client/GetEmbassies`).subscribe({
      next: (result: any) => console.log(result),
      error: (err: HttpErrorResponse) => console.log(err),
    });

    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: '#42A5F5',
              tension: .4
          }
      ]
  };
  }

  
}
