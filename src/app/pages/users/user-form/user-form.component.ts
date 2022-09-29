import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmPasswordValidator } from '@app/core/validators';
import { HttpService } from '@app/shared/services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  roles: any;
  userForm: FormGroup;
  password: string = '';
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private httpSvc: HttpService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef) {

    this.userForm = this.fb.group({
      id: '0',
      firstName: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      lastName: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }
    );
  }

  ngOnInit(): void {
    this.httpSvc.get('User/GetRoles').subscribe(response => {
      this.roles = response.sort((a: any, b: any) => a.name.localeCompare(b.name));;
    });



    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.loadUserDetails(id);
    } else {
      this.userForm.addValidators(ConfirmPasswordValidator(this.userForm.get('password'), this.userForm.get('confirmPassword')))
    }
  }

  loadUserDetails(id: string) {
    this.httpSvc.get(`User/GetUserById/${id}`).subscribe(response => {
      console.log(response);


      this.userForm.patchValue({
        id: response.userId,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.userName,
        role: response.role
      })

      this.userForm.get('password')?.setValidators(null);
      this.userForm.get('password')?.setErrors(null);
      this.userForm.get('confirmPassword')?.setValidators(null);
      this.userForm.get('confirmPassword')?.setErrors(null);
      this.userForm.get('email')?.disable();

      this.userForm.updateValueAndValidity();
    })
  }

  validateControl(controlName: string): boolean {
    if ((this.userForm.get(controlName)?.dirty || this.userForm.get(controlName)?.touched) && this.userForm.get(controlName)?.invalid) {
      return true;
    }
    return false;
  }

  save(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched;
      return;
    }

    let url = 'User/Create';
    if (this.isEdit) {
      url = 'User/Update';
    }

    this.httpSvc.post(url, this.userForm.getRawValue()).subscribe(response => {
      this.messageService.add({
        severity: response.status.toLowerCase(),
        summary: 'Save Record',
        detail: response.message,
      });

      this.router.navigate(['users'])
    },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Save Record',
          detail: error.error.message,
        });
      })
  }

  changePassword() {
    //console.log(event.target.value)
    if (!this.isEdit) {
      return
    }

    if (this.userForm.get('password')?.value || this.userForm.get('confirmPassword')?.value) {
      this.userForm.get('password')?.setValidators([ Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]);
      this.userForm.addValidators(ConfirmPasswordValidator(this.userForm.get('password'), this.userForm.get('confirmPassword')))

      //workaround for not working validator, need to find other way
      if (this.userForm.get('password')?.value.length < 8) {
        this.userForm.get('password')?.setErrors({ pattern: true });
      }

    } else {
      this.userForm.get('password')?.setValidators(null);
      this.userForm.get('password')?.setErrors(null);
      this.userForm.get('confirmPassword')?.setValidators(null);
      this.userForm.get('confirmPassword')?.setErrors(null);
    }

    this.changeDetectorRef.detectChanges();
    this.userForm.markAllAsTouched();

    this.userForm.updateValueAndValidity();
  }
}
