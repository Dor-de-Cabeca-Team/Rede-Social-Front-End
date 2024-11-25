    import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-animaciontext',
  standalone: true,
  imports: [NgClass],
  templateUrl: './animaciontext.component.html',
  styleUrls: ['./animaciontext.component.scss']
})
export class AnimaciontextComponent implements OnInit, OnDestroy {
  texts: string[] = [
    "Liberte seus pensamentos 💡",
    "Conecte-se de verdade ✨",
    "Fofoca boa é igual delivery: entregamos rapidinho! 🏃‍♂️",
    "Liberte seus pensamentos sem mostrar seu rosto 🎭",
    "Fale sem medo, ninguém vai saber que foi você 👻",
    "Teu ex tá com alguém? Fofoca que é bem-vinda! 👀"
  ];
  displayText: string = '';
  showCursor: boolean = true;
  currentTextIndex: number = 0;
  private index: number = 0;
  private typingInterval: any;
  private cursorInterval: any;

  ngOnInit() {
    this.startTyping();
    this.startCursorBlink();
  }

  private startTyping() {
    this.typingInterval = setInterval(() => {
      if (this.index < this.texts[this.currentTextIndex].length) {
        this.displayText += this.texts[this.currentTextIndex].charAt(this.index);
        this.index++;
      } else {
        clearInterval(this.typingInterval);
        setTimeout(() => {
          this.displayText = '';
          this.index = 0;
          this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
          this.startTyping();
        }, 2000);
      }
    }, 100);
  }

  private startCursorBlink() {
    this.cursorInterval = setInterval(() => {
      this.showCursor = !this.showCursor;
    }, 500);
  }

  ngOnDestroy() {
    if (this.typingInterval) clearInterval(this.typingInterval);
    if (this.cursorInterval) clearInterval(this.cursorInterval);
  }
}