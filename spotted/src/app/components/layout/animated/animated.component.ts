// animated-component.component.ts
import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-animated-component',
  standalone: true, 
  templateUrl: './animated.component.html',
  styleUrls: ['./animated.component.scss'], 
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-200px)' }), 
        animate('5500ms ease-in', style({ opacity: 1, transform: 'translateY(1200)' })) 
      ]),
    ]),
  ],
})
export class AnimatedComponent {}