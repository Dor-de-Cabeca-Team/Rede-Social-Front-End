// animated.component.ts
import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-animated',
  standalone: true, 
  templateUrl: './animated.component.html',
  styleUrls: ['./animated.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }), 
        animate('2500ms ease-in', style({ opacity: 1, transform: 'translateY(0)' })) 
      ]),
    ]),
  ],
})
export class AnimatedComponent {}