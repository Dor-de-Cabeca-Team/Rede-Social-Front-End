import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentDto } from '../../../models/commentDTO/comment-dto';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { ComplainButtonComponent } from '../complain-button/complain-button.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, LikeButtonComponent, ComplainButtonComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() comment!: CommentDto;
}
