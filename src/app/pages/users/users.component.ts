import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '@app/shared/services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  items: any;

  isLoading: boolean = true;

  constructor(private httpSvc: HttpService, private router: Router) {}

  ngOnInit(): void {
    console.log('init');
  }

  addUser() {
    this.router.navigate(['users/new']);
  }

  loadUsers() {
    this.httpSvc.get('User/GetAllUsers').subscribe(response => {
      this.items = response;
      this.isLoading = false;
    });
  }

  editUser(item: any) {
    console.log(item);
  }

  deleteUser(item: any) {
    console.log(item);
  }
}
