import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCommentComponent } from './modal-comment.component';

describe('ModalCommentComponent', () => {
  let component: ModalCommentComponent;
  let fixture: ComponentFixture<ModalCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCommentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
