import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  isLoading = signal<boolean>(false);

  show() {
    this.isLoading.set(false);
  }

  hide() {
    this.isLoading.set(true);
  }
}