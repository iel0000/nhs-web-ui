import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from '@app/core/validators';
import { HttpService } from '@app/shared/services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userForm: any;
  isEdit: any;
  branchName!: string;

  constructor(
    private httpSvc: HttpService,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private messageService: MessageService,
    private router: Router
  ) {}

  get email() {
    return this.userForm.get('email').value;
  }
  get role() {
    return this.userForm.get('role').value;
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: '0',
      firstName: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      lastName: ['', [Validators.required, Validators.pattern(/[\S]/)]],
      email: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/),
        ],
      ],
      confirmPassword: ['', Validators.required],
      role: [''],
      branch: [''],
    });

    this.loadProfile();
  }

  loadProfile() {
    this.httpSvc.get('Admin/GetProfile').subscribe(response => {
      console.log(response);

      this.userForm.patchValue({
        id: response.userId,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.userName,
        role: response.role,
        branch: response.branch,
      });

      this.branchName = response.branchName;

      this.userForm.get('password')?.setValidators(null);
      this.userForm.get('password')?.setErrors(null);
      this.userForm.get('confirmPassword')?.setValidators(null);
      this.userForm.get('confirmPassword')?.setErrors(null);

      this.userForm.updateValueAndValidity();
    });
  }

  validateControl(controlName: string): boolean {
    if (
      (this.userForm.get(controlName)?.dirty ||
        this.userForm.get(controlName)?.touched) &&
      this.userForm.get(controlName)?.invalid
    ) {
      return true;
    }
    return false;
  }

  save(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched;
      return;
    }

    this.httpSvc
      .post('Admin/SaveProfile', this.userForm.getRawValue())
      .subscribe(
        response => {
          this.messageService.add({
            severity: response.status.toLowerCase(),
            summary: 'Save Record',
            detail: response.message,
          });

          this.router.navigate(['profile']);
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Save Record',
            detail: error.error.message,
          });
        }
      );
  }

  changePassword() {
    if (
      this.userForm.get('password')?.value ||
      this.userForm.get('confirmPassword')?.value
    ) {
      this.userForm
        .get('password')
        ?.setValidators([
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/),
        ]);
      this.userForm.addValidators(
        ConfirmPasswordValidator(
          this.userForm.get('password'),
          this.userForm.get('confirmPassword')
        )
      );

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
