import { Component } from '@angular/core';
import { FotterComponent } from '../fotter/fotter.component';
import { AnimatedComponent } from "../animated/animated.component.spec";
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FotterComponent, AnimatedComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
