import { Component, inject } from '@angular/core';
import { FotterComponent } from '../fotter/fotter.component';
import { AnimatedComponent } from "../animated/animated.component.spec";
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FotterComponent, AnimatedComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  router = inject(Router);
  criar_conta (){
    this.router.navigate([
      '/login'
    ])
  }
  

}
