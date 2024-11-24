// animaciontext.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimaciontextComponent } from './animaciontext.component';

describe('AnimaciontextComponent', () => {
  let component: AnimaciontextComponent;
  let fixture: ComponentFixture<AnimaciontextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimaciontextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimaciontextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});