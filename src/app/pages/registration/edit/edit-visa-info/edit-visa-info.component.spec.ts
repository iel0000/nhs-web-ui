import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVisaInfoComponent } from './edit-visa-info.component';

describe('EditVisaInfoComponent', () => {
  let component: EditVisaInfoComponent;
  let fixture: ComponentFixture<EditVisaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditVisaInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditVisaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
