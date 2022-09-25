import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditXrayRequisitionComponent } from './edit-xray-requisition.component';

describe('EditXrayRequisitionComponent', () => {
  let component: EditXrayRequisitionComponent;
  let fixture: ComponentFixture<EditXrayRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditXrayRequisitionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditXrayRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
