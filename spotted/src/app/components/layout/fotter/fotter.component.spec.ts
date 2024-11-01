import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotterComponent } from './fotter.component';

describe('FotterComponent', () => {
  let component: FotterComponent;
  let fixture: ComponentFixture<FotterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FotterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FotterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
