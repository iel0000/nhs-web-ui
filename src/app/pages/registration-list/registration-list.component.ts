import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '@app/shared/services';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit {

  items: any
  columns = [
    { field: 'id', header: 'ID' },
    { field: 'firstName', header: 'FIRST NAME' },
    { field: 'lastName', header: 'LAST NAME' },
    { field: 'dateCreated', header: 'DATE CREATED' },
    { field: 'createdBy', header: 'CREATED BY' },
  ]
  isLoading = false

  constructor(private router: Router, private httpSvc: HttpService) { }

  ngOnInit(): void { 
    this.loadTableItems()   
  }

  loadTableItems() {
    this.httpSvc.get('Client/GetRegistrationList').subscribe(response => {
      this.items = response
    })
  }

  loadRegisterPage() {
    this.isLoading = true;
    this.router.navigate(['register']);
  }

}
