import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from '../../components/layout/spinner/spinner.component';
import { SpinnerService } from './spinner.component';
describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerComponent],
      providers: [SpinnerService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
