import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '@app/shared/services';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  items: any;

  isLoading: boolean = true;

  constructor(
    private httpSvc: HttpService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

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
    this.router.navigate([`users/edit/${item.userId}`]);
  }

  deleteUser(item: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete selected record?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.httpSvc.get(`User/Delete/${item.userId}`).subscribe(
          response => {
            this.messageService.add({
              severity: response.status.toLowerCase(),
              summary: 'Delete Record',
              detail: response.message,
            });
            this.loadUsers();
          },
          error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Delete Record',
              detail: error.message,
            });
          }
        );
      },
    });
  }
}
