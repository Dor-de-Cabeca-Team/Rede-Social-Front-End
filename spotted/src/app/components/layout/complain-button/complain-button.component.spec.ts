import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainButtonComponent } from './complain-button.component';

describe('ComplainButtonComponent', () => {
  let component: ComplainButtonComponent;
  let fixture: ComponentFixture<ComplainButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplainButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComplainButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
