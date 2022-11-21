import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@app/shared/services';

@Component({
  selector: 'app-branches-form',
  templateUrl: './branches-form.component.html',
  styleUrls: ['./branches-form.component.scss'],
})
export class BranchesFormComponent implements OnInit {
  branchForm: FormGroup;

  title = 'Create Branch';
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpSvc: HttpService
  ) {
    this.branchForm = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = 'Edit Branch';
      this.isEdit = true;
    } else {
    }
  }

  save() {
    console.log('save');
  }

  validateControl(controlName: string): boolean {
    if (
      (this.branchForm.get(controlName)?.dirty ||
        this.branchForm.get(controlName)?.touched) &&
      this.branchForm.get(controlName)?.invalid
    ) {
      return true;
    }
    return false;
  }
}
