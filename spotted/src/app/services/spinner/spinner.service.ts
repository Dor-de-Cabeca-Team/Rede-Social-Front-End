import { Injectable, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SpinnerService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  
  // Optional: Using signals for newer Angular versions
  loading = signal(false);

  show() {
    this.loadingSubject.next(true);
    this.loading.set(true);
  }

  hide() {
    this.loadingSubject.next(false);
    this.loading.set(false);
  }
}