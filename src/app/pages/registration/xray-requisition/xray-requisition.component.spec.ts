import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XrayRequisitionComponent } from './xray-requisition.component';

describe('XrayRequisitionComponent', () => {
  let component: XrayRequisitionComponent;
  let fixture: ComponentFixture<XrayRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XrayRequisitionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(XrayRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
