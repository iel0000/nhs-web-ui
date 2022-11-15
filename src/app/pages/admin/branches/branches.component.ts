import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss'],
})
export class BranchesComponent implements OnInit {
  items: any;
  isLoading: boolean = true;

  constructor() {}

  ngOnInit(): void {
    console.log('init');
  }

  loadBranches() {}

  addBranch() {}

  editBranch(item: any) {}

  deleteBranch(item: any) {}
}
