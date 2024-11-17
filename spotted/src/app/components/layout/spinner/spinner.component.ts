import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../../../services/spinner/spinner.component';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: './spinner.component.html'
})
export class SpinnerComponent {
  constructor(public spinnerService: SpinnerService) {}
}