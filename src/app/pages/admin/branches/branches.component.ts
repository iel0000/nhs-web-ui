import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '@app/shared/services';
import { MessageService } from 'primeng/api';

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
    private msgSvc: MessageService,
    private router: Router
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

  deleteBranch(item: any) {}
}
