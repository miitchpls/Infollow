import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingPageService {
  public isLoading = new Subject<boolean>();

  constructor() {}

  public startLoading(): void {
    this.isLoading.next(true);
  }

  public stopLoading(): void {
    this.isLoading.next(false);
  }
}
