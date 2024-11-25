import { Component, inject } from '@angular/core';
import { FotterComponent } from '../fotter/fotter.component';
import { AnimatedComponent } from "../animated/animated.component.spec";
import { Router } from '@angular/router';
import { AnimaciontextComponent } from "../animaciontext/animaciontext.component";
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FotterComponent, AnimatedComponent, AnimaciontextComponent],
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
