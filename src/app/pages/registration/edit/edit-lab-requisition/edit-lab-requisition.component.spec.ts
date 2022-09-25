import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLabRequisitionComponent } from './edit-lab-requisition.component';

describe('EditLabRequisitionComponent', () => {
  let component: EditLabRequisitionComponent;
  let fixture: ComponentFixture<EditLabRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditLabRequisitionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditLabRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
