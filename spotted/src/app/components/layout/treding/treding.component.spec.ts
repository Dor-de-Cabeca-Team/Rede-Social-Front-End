import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TredingComponent } from './treding.component';

describe('TredingComponent', () => {
  let component: TredingComponent;
  let fixture: ComponentFixture<TredingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TredingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TredingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
