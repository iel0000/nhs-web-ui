import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '@app/shared/services';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss'],
})
export class BranchesComponent implements OnInit {
  items: any;
  isLoading: boolean = true;

  constructor(
    private httpSvc: HttpService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    console.log('init');
  }

  loadBranches() {
    this.httpSvc.get('Admin/GetAllBranches').subscribe(response => {
      this.items = response;
      this.isLoading = false;
    });
  }

  addBranch() {
    this.router.navigate(['admin/branches/new']);
  }

  editBranch(item: any) {
    this.router.navigate([`admin/branches/edit/${item.id}`]);
  }

  deleteBranch(item: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete selected record?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.httpSvc.get(`Admin/DeleteBranch/${item.id}`).subscribe(
          response => {
            this.messageService.add({
              severity: response.status.toLowerCase(),
              summary: 'Delete Record',
              detail: response.message,
            });
            this.loadBranches();
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
