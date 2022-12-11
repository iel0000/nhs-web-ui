import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@app/shared/services';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-branches-form',
  templateUrl: './branches-form.component.html',
  styleUrls: ['./branches-form.component.scss'],
})
export class BranchesFormComponent implements OnInit {
  branchForm: FormGroup;
  selectedCountry!: string;
  countryList!: SelectItem[];
  disabledDates!: any[];
  selectedRows!: any[];
  showDialog = false;
  disabledDate: any;
  submitted = false;
  today!: Date;
  selectedDates!: Date[];

  title = 'Create Branch';
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpSvc: HttpService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.branchForm = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      location: ['', Validators.required],
      country: ['', Validators.required],
      slotCount: [10, Validators.required],
    });

    this.disabledDates = [];
    this.today = new Date();
    this.today.setDate(this.today.getDate() + 1);
  }

  ngOnInit(): void {
    this.httpSvc.get('Admin/GetCountryList').subscribe(response => {
      this.countryList = Object.keys(response).map(key => ({
        value: key,
        label: response[key],
      }));
    });

    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = 'Edit Branch';
      this.isEdit = true;
      this.loadBranchDetails(id);
    }
  }

  loadBranchDetails(id: string) {
    this.httpSvc.get(`Admin/GetBranchById/${id}`).subscribe(response => {
      this.branchForm.patchValue({
        id: response.id,
        name: response.name,
        location: response.location,
        country: response.country,
        slotCount: response.slotCount,
      });

      this.disabledDates = [];
      if (response.disabledDates && response.disabledDates.length > 0) {
        response.disabledDates.forEach((element: string) => {
          this.disabledDates.push(new Date(element));
        });

        this.disabledDates.sort(
          (b, a) => new Date(b).getTime() - new Date(a).getTime()
        );
      }
    });
  }

  getSelectedCountryName(countryCode: string) {
    return this.countryList.find(x => x.value == countryCode)?.label;
  }

  save() {
    let selectedDates: string[] = [];
    this.disabledDates.forEach(x => {
      selectedDates.push(formatDate(x, 'yyyy-MM-ddT00:00:00.000', 'en-US'));
    });

    let payload = {
      ...this.branchForm.getRawValue(),
      disabledDates: selectedDates,
    };

    this.httpSvc.post('Admin/SaveBranch', payload).subscribe(
      response => {
        this.messageService.add({
          severity: response.status.toLowerCase(),
          summary: 'Save Record',
          detail: response.message,
        });

        this.router.navigate(['admin/branches']);
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

  openNew() {
    this.disabledDate = {};
    this.submitted = false;
    this.showDialog = true;
    this.selectedDates = this.disabledDates;
  }

  removeItem(item: any) {
    this.disabledDates = this.disabledDates.filter(val => val !== item);
    this.disabledDate = {};
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Row Deleted',
      life: 3000,
    });
  }

  deleteSelectedRows() {
    this.disabledDates = this.disabledDates.filter(
      val => !this.selectedRows.includes(val)
    );
    this.selectedRows = [];
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Rows Deleted',
      life: 3000,
    });
  }

  hideDialog() {
    this.showDialog = false;
    this.submitted = false;
    this.selectedDates = [];
  }

  saveItem() {
    this.submitted = true;
    this.disabledDates = this.selectedDates.filter(x => x != null);
    this.disabledDates.sort(
      (b, a) => new Date(b).getTime() - new Date(a).getTime()
    );
    this.showDialog = false;
  }
}
