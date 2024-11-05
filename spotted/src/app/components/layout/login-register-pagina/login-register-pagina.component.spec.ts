import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterPaginaComponent } from './login-register-pagina.component';

describe('LoginRegisterPaginaComponent', () => {
  let component: LoginRegisterPaginaComponent;
  let fixture: ComponentFixture<LoginRegisterPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRegisterPaginaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginRegisterPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
