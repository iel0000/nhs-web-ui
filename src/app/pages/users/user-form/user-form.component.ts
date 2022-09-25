import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '@app/shared/services';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  roles: any;
  userForm: FormGroup;
  password: string = '';
  constructor(private fb: FormBuilder, private httpSvc: HttpService) {
    this.userForm = this.fb.group({
      id: 0,
      firstName: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      lastName: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      //confirmPassword: ['', Validators.required, Validators.minLength(8)],
      role: ['', Validators.required],
      avatar: '',
    });
  }

  ngOnInit(): void {
    this.httpSvc.get('User/GetRoles').subscribe(response => {
      this.roles = response;
    });
  }
}
