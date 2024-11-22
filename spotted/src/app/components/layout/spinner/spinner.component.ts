import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from '../../../services/spinner/spinner.service';@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: ''
})
export class SpinnerComponent {
  constructor(public spinnerService: SpinnerService) {}
}