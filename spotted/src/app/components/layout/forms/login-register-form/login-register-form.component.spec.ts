import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterFormComponent } from './login-register-form.component';

describe('LoginRegisterFormComponent', () => {
  let component: LoginRegisterFormComponent;
  let fixture: ComponentFixture<LoginRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRegisterFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
